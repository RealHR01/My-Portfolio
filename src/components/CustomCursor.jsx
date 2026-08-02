import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const stateRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    // Only on pointer devices
    if (!window.matchMedia('(hover: hover)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const pos = { x: mouse.x, y: mouse.y }

    const setDot = gsap.quickSetter(dot, 'css')
    const setRing = gsap.quickSetter(ring, 'css')

    // Immediate dot position
    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      setDot({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Lerped ring
    const tick = () => {
      const dt = 1 - Math.pow(0.78, gsap.ticker.deltaRatio())
      pos.x += (mouse.x - pos.x) * dt
      pos.y += (mouse.y - pos.y) * dt
      setRing({ x: pos.x, y: pos.y })
    }
    gsap.ticker.add(tick)

    // Hover in/out
    const onEnter = () => {
      gsap.to(ring, { scale: 2, borderColor: 'rgba(37,99,235,0.7)', duration: 0.35, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(255,255,255,0.45)', duration: 0.5, ease: 'elastic.out(1,0.5)' })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    const addListeners = (el) => {
      if (el._cursorBound) return
      el._cursorBound = true
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    }

    document.querySelectorAll('a, button, [role="button"]').forEach(addListeners)

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(addListeners)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.1 })
    const onUp = () => gsap.to(ring, { scale: stateRef.current.active ? 2 : 1, duration: 0.2, ease: 'power2.out' })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      gsap.ticker.remove(tick)
      observer.disconnect()
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
          background: '#fff',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 42, height: 42,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.45)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99998,
          willChange: 'transform',
        }}
      />
    </>
  )
}
