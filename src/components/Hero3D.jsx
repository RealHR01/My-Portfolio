import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useMobile } from '../hooks/useMobile'

export default function Hero3D() {
  const mountRef = useRef(null)
  const isMobile = useMobile()

  useEffect(() => {
    if (isMobile) return
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth
    const H = el.clientHeight

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 200)
    camera.position.z = 5

    // Wireframe icosahedron — large, centred on right side
    const geo = new THREE.IcosahedronGeometry(1.5, 3)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      metalness: 0.7,
      roughness: 0.3,
      wireframe: false,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(1.8, 0.2, 0)
    scene.add(mesh)

    // Inner glow sphere
    const innerGeo = new THREE.SphereGeometry(1.0, 32, 32)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.12,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    innerMesh.position.copy(mesh.position)
    scene.add(innerMesh)

    // Wireframe overlay
    const wireGeo = new THREE.IcosahedronGeometry(1.52, 3)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4f86f7,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    wireMesh.position.copy(mesh.position)
    scene.add(wireMesh)

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const point1 = new THREE.PointLight(0x2563eb, 3, 12)
    point1.position.set(3, 2, 3)
    scene.add(point1)
    const point2 = new THREE.PointLight(0x7c3aed, 2, 12)
    point2.position.set(-2, -1, 2)
    scene.add(point2)

    // Scattered particles around the mesh
    const pCount = 400
    const pPositions = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const r = 2.5 + Math.random() * 2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pPositions[i * 3]     = mesh.position.x + r * Math.sin(phi) * Math.cos(theta)
      pPositions[i * 3 + 1] = mesh.position.y + r * Math.sin(phi) * Math.sin(theta) * 0.8
      pPositions[i * 3 + 2] = r * Math.cos(phi) * 0.5
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.022, color: 0x4f86f7, transparent: true, opacity: 0.5 })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Mouse
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const onMouse = (e) => {
      mouse.targetX = ((e.clientX / window.innerWidth) - 0.5) * 2
      mouse.targetY = -((e.clientY / window.innerHeight) - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // Scroll — break apart effect
    let scrollFactor = 0
    const onScroll = () => {
      const heroH = el.clientHeight
      scrollFactor = Math.min(window.scrollY / heroH, 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let id, t = 0
    const BASE_SCALE = 1
    const animate = () => {
      id = requestAnimationFrame(animate)
      t += 0.006

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      // Slow auto-rotation + mouse tilt
      mesh.rotation.x = Math.sin(t * 0.4) * 0.25 + mouse.y * 0.35
      mesh.rotation.y = t * 0.28 + mouse.x * 0.4

      wireMesh.rotation.x = mesh.rotation.x
      wireMesh.rotation.y = mesh.rotation.y

      // Breathing scale
      const breathe = 1 + Math.sin(t * 0.9) * 0.03
      mesh.scale.setScalar(breathe * BASE_SCALE * (1 - scrollFactor * 0.4))

      // Scroll: explode particles outward
      const sf = scrollFactor
      particles.position.y = sf * 2
      pMat.opacity = 0.5 * (1 - sf)
      mat.opacity = 1 - sf * 0.8
      wireMat.opacity = 0.18 * (1 - sf)
      innerMat.opacity = 0.12 * (1 - sf)

      // Scroll: rotate faster as breaking apart
      if (sf > 0) {
        mesh.rotation.y += sf * 0.06
        mesh.rotation.x += sf * 0.03
      }

      // Point light pulsing
      point1.intensity = 3 + Math.sin(t * 1.2) * 0.6
      point2.intensity = 2 + Math.cos(t * 0.8) * 0.4

      // Particles gentle drift
      particles.rotation.y = t * 0.04 + mouse.x * 0.1

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const W = el.clientWidth, H = el.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ;[geo, mat, innerGeo, innerMat, wireGeo, wireMat, pGeo, pMat].forEach(o => o.dispose())
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [isMobile])

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
