import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos   = { x: mouse.x, y: mouse.y }
    let moved   = false

    const setDot  = gsap.quickSetter(dot,  'css')
    const setRing = gsap.quickSetter(ring, 'css')

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      moved = true
      setDot({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Lerped ring — only runs math when mouse has moved
    const tick = () => {
      if (!moved) return
      const dt = 1 - Math.pow(0.80, gsap.ticker.deltaRatio())
      pos.x += (mouse.x - pos.x) * dt
      pos.y += (mouse.y - pos.y) * dt
      setRing({ x: pos.x, y: pos.y })
      if (Math.abs(mouse.x - pos.x) < 0.1 && Math.abs(mouse.y - pos.y) < 0.1) moved = false
    }
    gsap.ticker.add(tick)

    // Hover effects — attach once, no MutationObserver
    const onEnter = () => gsap.to(ring, { scale: 2, borderColor: 'rgba(37,99,235,0.7)', duration: 0.3, ease: 'power2.out' })
    const onLeave = () => gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.45)', duration: 0.45, ease: 'elastic.out(1,0.5)' })

    const attach = (el) => {
      if (el._cb) return
      el._cb = true
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    }
    document.querySelectorAll('a, button, [role="button"]').forEach(attach)

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.1 })
    const onUp   = () => gsap.to(ring, { scale: 1,   duration: 0.2, ease: 'power2.out' })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.45)',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
        }}
      />
    </>
  )
}
