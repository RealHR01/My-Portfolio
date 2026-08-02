import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from '../lib/gsap'

/* ─── Character-by-character reveal ─────────────────────────── */
function CharReveal({ text, style, startDelay = 0 }) {
  return (
    <span style={{ ...style, display: 'block' }} aria-label={text}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '110%', rotateX: -60 }}
          animate={{ opacity: 1, y: '0%', rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: startDelay + i * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: 'inline-block' }}
          aria-hidden
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

/* ─── Counter view ───────────────────────────────────────────── */
function CounterView({ onDone }) {
  const [n, setN] = useState(0)
  const obj = useRef({ v: 0 })

  useEffect(() => {
    const tween = gsap.to(obj.current, {
      v: 100,
      duration: 2.1,
      ease: 'power2.inOut',
      onUpdate: () => setN(Math.round(obj.current.v)),
      onComplete: onDone,
    })
    return () => tween.kill()
  }, [onDone])

  return (
    <motion.div
      key="counter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.25 }}
      className="text-center"
    >
      <div
        className="font-heading font-black tabular-nums"
        style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', lineHeight: 1, color: '#FAFAFA' }}
      >
        {String(n).padStart(3, '0')}
      </div>
      <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-fg-muted mt-3">
        Loading
      </p>
    </motion.div>
  )
}

/* ─── Name reveal view ───────────────────────────────────────── */
function NameView() {
  return (
    <motion.div
      key="name"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.3 }}
      className="text-center overflow-hidden"
      style={{ perspective: '600px' }}
    >
      <div
        className="font-heading"
        style={{ fontSize: 'clamp(3.5rem, 10vw, 8.5rem)', lineHeight: 1, fontWeight: 900 }}
      >
        <CharReveal
          text="Hashir"
          style={{ color: '#FAFAFA', letterSpacing: '-0.02em' }}
          startDelay={0}
        />
        <CharReveal
          text="Raza"
          style={{
            WebkitTextStroke: '2px rgba(250,250,250,0.6)',
            color: 'transparent',
            letterSpacing: '-0.02em',
          }}
          startDelay={0.18}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="text-[11px] font-semibold uppercase tracking-[0.3em] mt-4"
        style={{ color: '#2563EB' }}
      >
        Support Head · GHL Expert · Founder
      </motion.p>
    </motion.div>
  )
}

/* ─── Preloader ──────────────────────────────────────────────── */
export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('counting') // counting | name

  const handleCountDone = () => {
    setTimeout(() => setPhase('name'), 120)
    // Tell parent to remove us from tree after name reveal plays
    setTimeout(onComplete, 2000)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#09090B' }}
      exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Top-left logo */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <span className="font-heading font-black text-brand-fg text-xl tracking-tight">
          HR<span style={{ color: '#2563EB' }}>.</span>
        </span>
        <div className="w-8 h-px bg-brand-border" />
        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-brand-fg-muted">
          Portfolio
        </span>
      </div>

      {/* Top-right year */}
      <span className="absolute top-8 right-8 text-[10px] font-mono text-brand-fg-muted tracking-[0.3em] uppercase">
        2025
      </span>

      {/* Center content */}
      <div className="relative flex flex-col items-center" style={{ perspective: '600px' }}>
        <AnimatePresence mode="wait">
          {phase === 'counting' && <CounterView key="counter" onDone={handleCountDone} />}
          {phase === 'name'     && <NameView key="name" />}
        </AnimatePresence>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="h-px bg-brand-border overflow-hidden rounded-full">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.1, ease: [0.45, 0, 0.55, 1] }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[9px] font-mono text-brand-fg-muted uppercase tracking-[0.2em]">Initializing</span>
          <span className="text-[9px] font-mono text-brand-fg-muted uppercase tracking-[0.2em]">hashirraza.com</span>
        </div>
      </div>
    </motion.div>
  )
}
