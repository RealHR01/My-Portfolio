import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <>
      {/* Track — faint grey */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 20,
          bottom: 0,
          width: '1px',
          background: 'rgba(255,255,255,0.06)',
          zIndex: 99997,
          pointerEvents: 'none',
        }}
      />
      {/* Fill — blue → purple → pink glow */}
      <motion.div
        aria-hidden
        style={{
          scaleY,
          transformOrigin: 'top',
          position: 'fixed',
          top: 0,
          left: 20,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, #2563EB 0%, #7C3AED 50%, #DB2777 100%)',
          boxShadow: '0 0 6px 2px rgba(124,58,237,0.55), 0 0 18px 4px rgba(124,58,237,0.2)',
          zIndex: 99998,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
