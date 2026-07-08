import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import { useMobile } from '../hooks/useMobile'

const roles = ['Support Head', 'GHL Expert', 'Startup Founder', 'CRM Architect']

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

function WordReveal({ text, delay = 0 }) {
  const words = text.split(' ')
  return (
    <span className="inline-flex flex-wrap gap-x-[0.22em]">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.07,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          className="inline-block"
          style={{ perspective: 600 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

function GridBackground({ scrollY }) {
  const isMobile = useMobile()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const y1 = useTransform(scrollY, [0, 600], [0, -80])
  const y2 = useTransform(scrollY, [0, 600], [0, -120])

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {!isMobile && (
        <>
          <motion.div
            style={{ y: y1 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-brand-accent blur-[140px]"
          />
          <motion.div
            style={{ y: y2 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.14, 0.07] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-violet-500 blur-[120px]"
          />
        </>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-bg to-transparent" />
    </motion.div>
  )
}

function PhotoFrame() {
  const isMobile = useMobile()
  const tiltRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    const rect = tiltRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setTilt({
      x: ((y - rect.height / 2) / (rect.height / 2)) * -10,
      y: ((x - rect.width / 2) / (rect.width / 2)) * 10,
    })
  }

  return (
    // Outer wrapper: dramatic entrance + float loop
    <motion.div
      initial={{ opacity: 0, x: 60, scale: 0.88 }}
      animate={{ opacity: 1, x: 0, scale: 1, y: [0, -14, 0] }}
      transition={{
        opacity: { duration: 0.7, delay: 0.3 },
        x: { duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] },
        scale: { duration: 0.7, delay: 0.3 },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
      }}
      className="relative w-full max-w-sm mx-auto lg:mx-0 lg:max-w-none"
    >
      {/* Spinning gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-[3px] rounded-3xl z-0"
        style={{
          background: 'conic-gradient(from 0deg, #2563EB, #7C3AED, #DB2777, #2563EB)',
          filter: 'blur(1px)',
        }}
      />

      {/* Background solid to mask ring behind image */}
      <div className="absolute inset-0 rounded-3xl bg-brand-bg z-[1]" />

      {/* Pulsing glow behind the whole frame */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-2 rounded-3xl z-0 blur-2xl"
        style={{ background: 'radial-gradient(ellipse, #2563EB55, #7C3AED33, transparent)' }}
      />

      {/* Inner tilt card */}
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
        style={{
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
          decoding="async"
        />

        {/* Shimmer sweep — repeats every 4s */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.09) 50%, transparent 65%)',
          }}
        />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-brand-bg/70 to-transparent pointer-events-none z-[3]" />
      </div>

      {/* Badge — top left: Available */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
        className="absolute top-5 -left-5 z-[5] flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-surface/95 backdrop-blur-md border border-brand-border shadow-xl text-xs font-semibold text-brand-fg"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        Available for Projects
      </motion.div>

      {/* Badge — bottom right: HighLevel Expert */}
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

      {/* Orbiting dots — desktop only */}
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

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 500], [0, 50])

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
      <GridBackground scrollY={scrollY} />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-28 lg:py-0 min-h-screen lg:min-h-0 lg:py-32">

          {/* ── Left: text content ── */}
          <div className="flex flex-col items-start gap-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-border bg-brand-surface/60 backdrop-blur-sm text-xs font-medium text-brand-fg-muted mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Support Head · Level Up Marketplace
            </motion.div>

            {/* Name */}
            <h1
              className="font-heading font-black leading-[0.93] tracking-tight mb-4 text-brand-fg"
              style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
            >
              <WordReveal text="Hashir Raza" delay={0.1} />
            </h1>

            {/* Dynamic role */}
            <div className="h-10 flex items-center mb-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 40, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -40, opacity: 0, filter: 'blur(6px)' }}
                  transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                  className="font-heading font-bold text-lg uppercase tracking-[0.18em] text-brand-accent"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base text-brand-fg-muted leading-relaxed max-w-md mb-8"
            >
              Scaling agencies with expert support & custom HighLevel solutions.
              From workflow automation to full-stack CRM development.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-5"
            >
              <MagneticButton href="#ventures" primary>
                View My Work <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton href="#contact">
                Get in Touch <ExternalLink size={14} />
              </MagneticButton>
            </motion.div>

            {/* Social buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.82 }}
              className="flex items-center gap-3 mb-12"
            >
              {/* Facebook */}
              <motion.a
                href="https://www.facebook.com/hashirlump"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-brand-border bg-brand-surface/60 backdrop-blur-sm transition-all duration-300 hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10"
              >
                <svg className="w-4 h-4 text-brand-fg-muted group-hover:text-[#1877F2] transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-xs font-semibold text-brand-fg-muted group-hover:text-[#1877F2] transition-colors">Facebook</span>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://www.instagram.com/imhashiir"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
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
              transition={{ duration: 0.7, delay: 0.95 }}
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
                  transition={{ delay: 1 + i * 0.1 }}
                >
                  <div
                    className="font-heading font-black text-brand-fg"
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
          </div>

          {/* ── Right: photo ── */}
          <div className="flex justify-center lg:justify-end">
            <PhotoFrame />
          </div>

        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-brand-fg-muted"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-brand-fg-muted to-transparent"
        />
      </motion.div>
    </section>
  )
}
