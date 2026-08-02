import { motion } from 'framer-motion'

const variants = {
  initial: { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
  enter:   { clipPath: 'inset(0 0% 0 0)',   opacity: 1, transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } },
  exit:    { clipPath: 'inset(0 0 0 100%)', opacity: 1, transition: { duration: 0.6,  ease: [0.76, 0, 0.24, 1] } },
}

export function PageCurtain() {
  return (
    <motion.div
      className="fixed inset-0 bg-brand-accent z-[99999] pointer-events-none"
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    />
  )
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  )
}
