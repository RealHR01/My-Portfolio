import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import { useMobile } from '../hooks/useMobile'
import HeroParticles from './HeroParticles'

const roles = ['Support Head', 'GHL Expert', 'Startup Founder', 'CRM Architect']

/* ── Magnetic CTA button ─────────────────────────────────────── */
function MagneticButton({ children, href, primary = false }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide cursor-pointer transition-all duration-200 ${
        primary
          ? 'bg-brand-accent hover:bg-brand-accent-light text-white shadow-xl shadow-brand-accent/30'
          : 'border border-brand-border hover:border-brand-muted text-brand-fg-muted hover:text-brand-fg bg-brand-surface/50 backdrop-blur-sm'
      }`}
    >
      {children}
    </motion.a>
  )
}

/* ── Char-reveal animation for "Hashir" ──────────────────────── */
function CharReveal({ text }) {
  const ref = useRef(null)
  useGSAP(() => {
    const chars = ref.current.querySelectorAll('.hc')
    gsap.from(chars, {
      opacity: 0,
      y: 100,
      rotateX: -80,
      duration: 0.85,
      stagger: 0.035,
      ease: 'back.out(1.4)',
      delay: 0.1,
    })
  }, { scope: ref })

  return (
    <span ref={ref} style={{ display: 'inline-flex', flexWrap: 'wrap', perspective: '700px' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="hc"
          style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  )
}

/* ── Outline reveal for "Raza" ───────────────────────────────── */
function OutlineReveal({ text }) {
  const ref = useRef(null)
  useGSAP(() => {
    const chars = ref.current.querySelectorAll('.oc')
    gsap.from(chars, {
      opacity: 0,
      y: 110,
      duration: 0.85,
      stagger: 0.045,
      ease: 'power4.out',
      delay: 0.55,
    })
  }, { scope: ref })

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-flex',
        WebkitTextStroke: '1.5px rgba(250,250,250,0.75)',
        color: 'transparent',
        perspective: '700px',
      }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="oc"
          style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

/* ── Photo frame with tilt ───────────────────────────────────── */
function PhotoFrame() {
  const isMobile = useMobile()
  const tiltRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = tiltRef.current.getBoundingClientRect()
    setTilt({
      x: ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -8,
      y: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1, y: [0, -12, 0] }}
      transition={{
        opacity: { duration: 0.7, delay: 0.3 },
        x: { duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] },
        scale: { duration: 0.7, delay: 0.3 },
        y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
      }}
      className="relative w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none"
    >
      {/* Spinning gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-[3px] rounded-3xl z-0"
        style={{ background: 'conic-gradient(from 0deg, #2563EB, #7C3AED, #DB2777, #2563EB)', filter: 'blur(1px)' }}
      />
      <div className="absolute inset-0 rounded-3xl bg-brand-bg z-[1]" />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-2 rounded-3xl z-0 blur-2xl"
        style={{ background: 'radial-gradient(ellipse, #2563EB55, #7C3AED33, transparent)' }}
      />
      <div
        ref={tiltRef}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseEnter={isMobile ? undefined : () => setHovered(true)}
        onMouseLeave={isMobile ? undefined : () => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
        style={isMobile ? undefined : {
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transition: hovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out',
        }}
        className="relative z-[2] rounded-3xl overflow-hidden shadow-2xl shadow-black/60"
      >
        <img
          src="/hashir.jpg"
          alt="Hashir Raza"
          className="w-full object-cover object-top block"
          style={{ aspectRatio: '4/5' }}
          loading="eager"
          fetchpriority="high"
        />
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.09) 50%, transparent 65%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-brand-bg/70 to-transparent pointer-events-none z-[3]" />
      </div>

      {/* Available badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute top-5 -left-5 z-[5] flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-surface/95 backdrop-blur-md border border-brand-border shadow-xl text-xs font-semibold text-brand-fg"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        Available for Projects
      </motion.div>

      {/* HighLevel badge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute -bottom-4 -right-4 z-[5] flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white shadow-lg shadow-brand-accent/40"
        style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
      >
        <MapPin size={11} />
        HighLevel Expert
      </motion.div>

      {/* Orbiting dots */}
      {!isMobile && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 z-[4] pointer-events-none"
            style={{ borderRadius: '40%' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-brand-accent shadow-lg shadow-brand-accent/60" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-8 z-[4] pointer-events-none"
            style={{ borderRadius: '40%' }}
          >
            <div className="absolute bottom-0 right-1/4 w-1.5 h-1.5 rounded-full bg-violet-400 shadow shadow-violet-400/60" />
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

/* ── Main Hero ───────────────────────────────────────────────── */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 60])
  const photoY = useTransform(scrollY, [0, 600], [0, 100])
  const bgOpacity = useTransform(scrollY, [0, 400], [1, 0])

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
      {/* Three.js particle field */}
      <HeroParticles />

      {/* Gradient blobs */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.14, 0.22, 0.14] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-48 w-[600px] h-[600px] rounded-full bg-brand-accent blur-[160px]"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full bg-violet-500 blur-[140px]"
        />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-bg to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-28 lg:py-0 min-h-screen lg:min-h-0 lg:py-32">

          {/* ── Left: text ── */}
          <motion.div style={{ y: contentY }} className="flex flex-col items-start gap-0">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 backdrop-blur-sm text-xs font-medium text-brand-fg-muted mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Support Head · Level Up Marketplace
            </motion.div>

            {/* Name — Hashir (filled) + Raza (outlined) */}
            <h1
              className="font-heading font-bold leading-[0.9] tracking-tight mb-5 text-brand-fg"
              style={{ fontSize: 'clamp(3.8rem, 9vw, 7.5rem)' }}
            >
              <span style={{ display: 'block' }}>
                <CharReveal text="Hashir" />
              </span>
              <span style={{ display: 'block' }}>
                <OutlineReveal text="Raza" />
              </span>
            </h1>

            {/* Dynamic role */}
            <div className="h-9 flex items-center mb-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 38, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -38, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.38, ease: [0.215, 0.61, 0.355, 1] }}
                  className="font-heading font-semibold text-base uppercase tracking-[0.2em] text-brand-accent"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="text-base text-brand-fg-muted leading-relaxed max-w-md mb-8"
            >
              Scaling agencies with expert support & custom HighLevel solutions.
              From workflow automation to full-stack CRM development.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.78 }}
              className="flex flex-wrap gap-3 mb-5"
            >
              <MagneticButton href="#ventures" primary>
                View My Work <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton href="#contact">
                Get in Touch <ExternalLink size={14} />
              </MagneticButton>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-3 mb-12"
            >
              <motion.a
                href="https://www.facebook.com/hashirlump"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-brand-border bg-brand-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10"
              >
                <svg className="w-4 h-4 text-brand-fg-muted group-hover:text-[#1877F2] transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-xs font-semibold text-brand-fg-muted group-hover:text-[#1877F2] transition-colors">Facebook</span>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/imhashiir"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-brand-border bg-brand-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/50 hover:bg-pink-500/10"
              >
                <svg className="w-4 h-4 text-brand-fg-muted group-hover:text-pink-400 transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-xs font-semibold text-brand-fg-muted group-hover:text-pink-400 transition-colors">@imhashiir</span>
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="flex gap-8 border-t border-brand-border pt-8"
            >
              {[
                { value: '5+', label: 'Years in GHL' },
                { value: '2', label: 'Startups' },
                { value: '100+', label: 'Agencies' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                >
                  <div
                    className="font-heading font-bold text-brand-fg"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-brand-fg-muted mt-1 uppercase tracking-widest whitespace-nowrap">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: photo ── */}
          <motion.div style={{ y: photoY }} className="flex justify-center lg:justify-end">
            <PhotoFrame />
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-brand-fg-muted"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-fg-muted to-transparent"
        />
      </motion.div>
    </section>
  )
}
