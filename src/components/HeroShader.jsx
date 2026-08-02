import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMobile } from '../hooks/useMobile'

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2  uMouse;
varying vec2  vUv;

float hash(vec2 p) {
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),              hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * vnoise(p);
    p *= 2.1;
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv = vUv;

  // gentle mouse warp
  vec2 toMouse = uv - (uMouse * 0.5 + 0.5);
  float mdist = length(toMouse);
  uv += normalize(toMouse) * 0.04 * (1.0 - smoothstep(0.0, 0.55, mdist));

  float t = uTime * 0.07;

  // domain-warped fbm — three layers of warping
  vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(1.7, 9.2) + t * 0.9));
  vec2 r = vec2(fbm(uv + 4.0*q + vec2(1.7, 9.2) + t*0.35),
                fbm(uv + 4.0*q + vec2(8.3, 2.8) + t*0.45));
  float f = fbm(uv + 4.2 * r + t * 0.2);

  // colour palette
  vec3 cA = vec3(0.01, 0.01, 0.03);   // near-black
  vec3 cB = vec3(0.03, 0.07, 0.20);   // dark navy
  vec3 cC = vec3(0.08, 0.03, 0.16);   // dark purple
  vec3 cD = vec3(0.12, 0.18, 0.50);   // mid blue-purple

  vec3 col = mix(
    mix(cA, cB, clamp(f * f * 4.0, 0.0, 1.0)),
    mix(cC, cD, clamp(f * 2.1, 0.0, 1.0)),
    clamp(length(q), 0.0, 1.0)
  );

  // subtle centre glow
  float glow = 1.0 - smoothstep(0.0, 0.85, length(uv - 0.5) * 1.6);
  col += vec3(0.02, 0.04, 0.12) * glow * 0.6;

  // vignette
  float vig = 1.0 - smoothstep(0.45, 1.45, length((uv - 0.5) * 1.7));
  col *= vig * 1.15;

  // film grain
  col += (hash(uv + fract(uTime * 0.013)) - 0.5) * 0.018;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

export default function HeroShader() {
  const mountRef = useRef(null)
  const isMobile = useMobile()

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'low-power' })
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const uniforms = {
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }

    const geo  = new THREE.PlaneGeometry(2, 2)
    const mat  = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    scene.add(new THREE.Mesh(geo, mat))

    const onMouse = (e) => {
      uniforms.uMouse.value.set(
        (e.clientX / window.innerWidth)  * 2 - 1,
       -(e.clientY / window.innerHeight) * 2 + 1,
      )
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const onResize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let id, start
    const animate = (ts) => {
      if (!start) start = ts
      id = requestAnimationFrame(animate)
      uniforms.uTime.value = (ts - start) * 0.001
      renderer.render(scene, camera)
    }
    id = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [isMobile])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
