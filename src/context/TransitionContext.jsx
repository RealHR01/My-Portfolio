import { createContext, useContext, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from '../lib/gsap'

const Ctx = createContext(null)

export function TransitionProvider({ children }) {
  const navigate   = useNavigate()
  const curtainRef = useRef(null)

  // slide curtain in → navigate → slide curtain out
  const go = useCallback((path) => {
    const curtain = curtainRef.current
    if (!curtain) { navigate(path); return }

    gsap.killTweensOf(curtain)
    gsap.set(curtain, { x: '-100%', pointerEvents: 'all' })

    gsap.to(curtain, {
      x: '0%',
      duration: 0.6,
      ease: 'power3.inOut',
      onComplete: () => {
        navigate(path)
        gsap.to(curtain, {
          x: '100%',
          duration: 0.55,
          ease: 'power3.inOut',
          delay: 0.05,
          onComplete: () => {
            gsap.set(curtain, { x: '-100%', pointerEvents: 'none' })
          },
        })
      },
    })
  }, [navigate])

  return (
    <Ctx.Provider value={{ go }}>
      {children}

      {/* Full-screen curtain overlay */}
      <div
        ref={curtainRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          zIndex: 99999,
          transform: 'translateX(-100%)',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="font-heading font-black text-white/20 select-none"
          style={{ fontSize: 'clamp(5rem, 16vw, 14rem)', lineHeight: 1 }}
        >
          HR.
        </span>
      </div>
    </Ctx.Provider>
  )
}

export function useTransition() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTransition must be used inside TransitionProvider')
  return ctx
}
