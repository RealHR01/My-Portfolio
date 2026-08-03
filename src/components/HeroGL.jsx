import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMobile } from '../hooks/useMobile'

/* ── GLSL: full-screen quad ──────────────────────────────────── */
const BG_VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`

const BG_FRAG = `
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
    mix(hash(i),                 hash(i + vec2(1.0,0.0)), f.x),
    mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), f.x),
    f.y
  );
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++) { v += a * vnoise(p); p *= 2.1; a *= 0.48; }
  return v;
}
void main() {
  vec2 uv = vUv;

  // mouse warp
  vec2 toM = uv - (uMouse * 0.5 + 0.5);
  float md = length(toM);
  uv += normalize(toM) * 0.055 * (1.0 - smoothstep(0.0, 0.6, md));

  float t = uTime * 0.09;

  // three-layer domain warp
  vec2 q = vec2(fbm(uv + t),              fbm(uv + vec2(1.7, 9.2) + t * 0.85));
  vec2 r = vec2(fbm(uv + 3.5*q + vec2(1.7,9.2) + t*0.32),
                fbm(uv + 3.5*q + vec2(8.3,2.8) + t*0.41));
  float f = fbm(uv + 4.0*r + t*0.18);

  // ── Visible colour palette ─────────────────────────────────
  // dark but clearly blue-purple, not near-black
  vec3 cA = vec3(0.02, 0.02, 0.08);   // dark indigo base
  vec3 cB = vec3(0.06, 0.16, 0.48);   // visible navy blue
  vec3 cC = vec3(0.16, 0.05, 0.36);   // visible deep purple
  vec3 cD = vec3(0.28, 0.42, 0.88);   // bright blue highlight

  vec3 col = mix(
    mix(cA, cB, clamp(f * f * 3.5, 0.0, 1.0)),
    mix(cC, cD, clamp(f * 2.2,     0.0, 1.0)),
    clamp(length(q) * 0.85, 0.0, 1.0)
  );

  // centre glow — pushes brightness up in the middle
  float glow = 1.0 - smoothstep(0.0, 0.75, length(uv - 0.5) * 1.4);
  col += vec3(0.04, 0.08, 0.22) * glow * 0.9;

  // soft vignette — only at the extreme edges, not the whole screen
  float vig = 1.0 - smoothstep(0.55, 1.3, length((uv - 0.5) * 1.5));
  col *= 0.85 + vig * 0.25;

  // film grain
  col += (hash(vUv + fract(uTime * 0.011)) - 0.5) * 0.016;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`

export default function HeroGL() {
  const mountRef = useRef(null)
  const isMobile = useMobile()

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    /* ── ONE renderer for both passes ────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: 'low-power',
    })
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.autoClear = false   // we manage clear() manually
    el.appendChild(renderer.domElement)

    /* ── Pass 1: background shader (orthographic) ─────────────── */
    const bgScene  = new THREE.Scene()
    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const bgUniforms = {
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }
    bgScene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({ vertexShader: BG_VERT, fragmentShader: BG_FRAG, uniforms: bgUniforms }),
    ))

    /* ── Pass 2: 3-D scene (perspective) — desktop only ─────────── */
    let fgScene = null, fgCamera = null
    let mesh = null, wireMesh = null, innerMesh = null, particles = null
    let wireMat = null, innerMat = null, pMat = null, mat = null

    if (!isMobile) {
      fgScene  = new THREE.Scene()
      fgCamera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200)
      fgCamera.position.z = 5

      /* icosahedron */
      const geo = new THREE.IcosahedronGeometry(1.5, 3)
      mat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.7, roughness: 0.3 })
      mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(1.8, 0.2, 0)
      fgScene.add(mesh)

      /* wireframe overlay */
      const wireGeo = new THREE.IcosahedronGeometry(1.52, 3)
      wireMat = new THREE.MeshBasicMaterial({ color: 0x4f86f7, wireframe: true, transparent: true, opacity: 0.18 })
      wireMesh = new THREE.Mesh(wireGeo, wireMat)
      wireMesh.position.copy(mesh.position)
      fgScene.add(wireMesh)

      /* inner glow sphere */
      innerMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.12 })
      innerMesh = new THREE.Mesh(new THREE.SphereGeometry(1.0, 32, 32), innerMat)
      innerMesh.position.copy(mesh.position)
      fgScene.add(innerMesh)

      /* lights */
      fgScene.add(new THREE.AmbientLight(0xffffff, 0.3))
      const p1 = new THREE.PointLight(0x2563eb, 3, 12)
      p1.position.set(3, 2, 3)
      fgScene.add(p1)
      const p2 = new THREE.PointLight(0x7c3aed, 2, 12)
      p2.position.set(-2, -1, 2)
      fgScene.add(p2)

      /* halo particles */
      const pCount = 400
      const pos = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        const r = 2.5 + Math.random() * 2
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        pos[i*3]   = mesh.position.x + r * Math.sin(phi) * Math.cos(theta)
        pos[i*3+1] = mesh.position.y + r * Math.sin(phi) * Math.sin(theta) * 0.8
        pos[i*3+2] = r * Math.cos(phi) * 0.5
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      pMat = new THREE.PointsMaterial({ size: 0.022, color: 0x4f86f7, transparent: true, opacity: 0.5 })
      particles = new THREE.Points(pGeo, pMat)
      fgScene.add(particles)
    }

    /* ── Mouse + scroll ─────────────────────────────────────────── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMouse = (e) => {
      bgUniforms.uMouse.value.set(
        (e.clientX / window.innerWidth)  * 2 - 1,
       -(e.clientY / window.innerHeight) * 2 + 1,
      )
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * -2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    let scrollFactor = 0
    const onScroll = () => {
      scrollFactor = Math.min(window.scrollY / el.clientHeight, 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── Animate ─────────────────────────────────────────────────── */
    let rafId, startTs, visible = true
    const animate = (ts) => {
      rafId = requestAnimationFrame(animate)
      if (!visible) return
      if (!startTs) startTs = ts
      const elapsed = (ts - startTs) * 0.001

      bgUniforms.uTime.value = elapsed

      /* Pass 1 — shader background */
      renderer.clear()
      renderer.render(bgScene, bgCamera)

      /* Pass 2 — 3-D mesh (desktop only) */
      if (fgScene && fgCamera && mesh) {
        mouse.x += (mouse.tx - mouse.x) * 0.04
        mouse.y += (mouse.ty - mouse.y) * 0.04

        mesh.rotation.x = Math.sin(elapsed * 0.4) * 0.25 + mouse.y * 0.35
        mesh.rotation.y = elapsed * 0.28 + mouse.x * 0.4
        wireMesh.rotation.x = mesh.rotation.x
        wireMesh.rotation.y = mesh.rotation.y

        const breathe = 1 + Math.sin(elapsed * 0.9) * 0.03
        const sf = scrollFactor
        mesh.scale.setScalar(breathe * (1 - sf * 0.4))

        mat.opacity       = 1 - sf * 0.8
        wireMat.opacity   = 0.18 * (1 - sf)
        innerMat.opacity  = 0.12 * (1 - sf)
        pMat.opacity      = 0.5  * (1 - sf)
        particles.position.y = sf * 2

        if (sf > 0) {
          mesh.rotation.y += sf * 0.06
          mesh.rotation.x += sf * 0.03
        }

        particles.rotation.y = elapsed * 0.04 + mouse.x * 0.1

        renderer.clearDepth()          // keep colour, clear depth
        renderer.render(fgScene, fgCamera)
      }
    }
    /* ── Pause when off-screen ──────────────────────────────────── */
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(el)

    rafId = requestAnimationFrame(animate)

    /* ── Resize ──────────────────────────────────────────────────── */
    const onResize = () => {
      const nW = el.clientWidth, nH = el.clientHeight
      renderer.setSize(nW, nH)
      if (fgCamera) {
        fgCamera.aspect = nW / nH
        fgCamera.updateProjectionMatrix()
      }
    }
    window.addEventListener('resize', onResize)

    /* ── Cleanup ─────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
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
