import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMobile } from '../hooks/useMobile'

const COLORS = [0x3b82f6, 0x6366f1, 0x8b5cf6, 0x2563eb]

export default function HeroParticles() {
  const mountRef = useRef(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (isMobile) return
    const mount = mountRef.current
    if (!mount) return

    const W = mount.offsetWidth
    const H = mount.offsetHeight

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200)
    camera.position.z = 38

    // Build particles
    const COUNT = 1600
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const col = new THREE.Color()

    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * 45 + 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.6
      col.setHex(COLORS[Math.floor(Math.random() * COLORS.length)])
      colors[i * 3] = col.r
      colors[i * 3 + 1] = col.g
      colors[i * 3 + 2] = col.b
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Mouse
    const mouse = { x: 0, y: 0 }
    const onMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Animate
    let rafId
    let t = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      t += 0.0004
      points.rotation.y += (mouse.x * 0.08 - points.rotation.y) * 0.03
      points.rotation.x += (mouse.y * 0.04 - points.rotation.x) * 0.03
      points.rotation.z = t
      mat.opacity = 0.45 + Math.sin(t * 3) * 0.06
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const W = mount.offsetWidth
      const H = mount.offsetHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [isMobile])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
