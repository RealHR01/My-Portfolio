import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        scaleX,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, #2563EB, #7C3AED, #2563EB)',
        backgroundSize: '200% 100%',
        transformOrigin: '0%',
        zIndex: 99998,
      }}
      aria-hidden
    />
  )
}
