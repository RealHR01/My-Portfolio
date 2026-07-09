import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { X, Star, Send, CheckCircle, PenLine, ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedBg from './AnimatedBg'

/* ─── Data ───────────────────────────────────────────────────── */
const testimonials = [
  {
    quote: "Hashir completely transformed how our agency handles client onboarding. The GHL workflows he built cut our setup time from days to under 2 hours. Genuinely one of the best hires we've ever made.",
    name: 'Marcus Webb',
    role: 'Agency Owner',
    company: 'WebScale Digital',
    initials: 'MW',
    color: '#2563EB',
    stars: 5,
  },
  {
    quote: "We had a complex multi-location restaurant setup that no one could crack. Hashir figured it out in a single session and built a full ordering flow with automated confirmations. Get Online Orders is a game changer.",
    name: 'Priya Nair',
    role: 'Operations Director',
    company: 'Spice Garden Group',
    initials: 'PN',
    color: '#059669',
    stars: 5,
  },
  {
    quote: "The white-label CRM setup from WLCRM made it so easy to launch our own branded product. Hashir's team handled everything — snapshots, onboarding, support docs. Our clients love it.",
    name: 'Jordan Ellis',
    role: 'SaaS Founder',
    company: 'NexusGrow',
    initials: 'JE',
    color: '#7C3AED',
    stars: 5,
  },
  {
    quote: "I've worked with a lot of GHL experts but Hashir operates at a different level. He understands the architecture deeply — our AI follow-up bot has a 38% reply rate. That's insane.",
    name: 'Tariq Osman',
    role: 'Marketing Director',
    company: 'LeadFlow Agency',
    initials: 'TO',
    color: '#D97706',
    stars: 5,
  },
  {
    quote: "Reached out to Level Up Marketplace after being stuck on a custom webhook integration for two weeks. Hashir resolved it in 45 minutes with a full explanation. Support like this is rare.",
    name: 'Sophie Laurent',
    role: 'Freelance Developer',
    company: 'Independent',
    initials: 'SL',
    color: '#0891B2',
    stars: 5,
  },
  {
    quote: "Our reporting dashboard went from zero to fully automated in under a week. The custom GHL reporting Hashir built now saves our account managers 10+ hours a month. Incredible ROI.",
    name: 'Derek Hutchinson',
    role: 'Head of Client Success',
    company: 'Elevate Agency',
    initials: 'DH',
    color: '#DC2626',
    stars: 5,
  },
  {
    quote: "Hashir built our entire sub-account architecture from scratch — permissions, snapshots, triggers, the works. What would have taken us months took three weeks. He thinks in systems.",
    name: 'Aisha Kamara',
    role: 'Co-Founder',
    company: 'BrightPath CRM',
    initials: 'AK',
    color: '#DB2777',
    stars: 5,
  },
  {
    quote: "Brought Hashir in to audit our HighLevel setup and within the first call he found 4 critical gaps we didn't know existed. His depth of knowledge is genuinely impressive.",
    name: 'Luca Ferretti',
    role: 'Technical Lead',
    company: 'Growth Partners',
    initials: 'LF',
    color: '#0891B2',
    stars: 5,
  },
  {
    quote: "The team at Level Up Marketplace is responsive and sharp, but Hashir specifically always goes beyond the ticket. He doesn't just fix the problem — he explains why it happened.",
    name: 'Chloe Winters',
    role: 'Agency Operator',
    company: 'Pulse Digital',
    initials: 'CW',
    color: '#059669',
    stars: 5,
  },
  {
    quote: "Hashir has been very close to us in this journey with Level Up MP. He has been extremely helpful and has provided us with a remarkable service, answering questions, mediating between us and the Dev Team, and being by our side on every doubt and issue we've encountered. I don't think we could have a better Support experience.",
    name: 'Oscar Arrieta',
    role: 'CRM Specialist',
    company: 'Blue Ridge Media Company',
    initials: 'OA',
    color: '#2563EB',
    stars: 5,
  },
  {
    quote: "Hashir was great! He followed up with me as promised and walked me through my issue.",
    name: "Lennett O'Neal",
    role: 'Client',
    company: 'Prime Step AI',
    initials: 'LO',
    color: '#7C3AED',
    stars: 5,
  },
]

/* ─── Slide animation variants ───────────────────────────────── */
const slide = {
  enter: (dir) => ({
    x: dir > 0 ? 72 : -72,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.38, ease: [0.215, 0.61, 0.355, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -72 : 72,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.55, 0, 1, 0.45] },
  }),
}

/* ─── Stars ──────────────────────────────────────────────────── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={14} height={14} viewBox="0 0 20 20" fill="#FBBF24">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/* ─── Star picker ────────────────────────────────────────────── */
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 focus:outline-none"
          aria-label={`${n} star`}
        >
          <Star
            size={24}
            className="transition-colors duration-100"
            fill={(hovered || value) >= n ? '#FBBF24' : 'none'}
            stroke={(hovered || value) >= n ? '#FBBF24' : '#3F3F46'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  )
}

/* ─── Modal ──────────────────────────────────────────────────── */
function TestimonialModal({ onClose }) {
  const [form, setForm] = useState({ name: '', role: '', company: '', review: '', rating: 0 })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.role.trim()) e.role = 'Role is required'
    if (!form.company.trim()) e.company = 'Company is required'
    if (!form.review.trim()) e.review = 'Review is required'
    else if (form.review.trim().length < 20) e.review = 'Please write at least 20 characters'
    if (!form.rating) e.rating = 'Please select a rating'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('submitting')
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
  }

  const inputCls = (key) =>
    `w-full bg-brand-bg border rounded-xl px-4 py-3 text-sm text-brand-fg placeholder-brand-muted outline-none transition-colors duration-200 focus:border-brand-accent ${
      errors[key] ? 'border-red-500/70' : 'border-brand-border hover:border-brand-muted'
    }`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative w-full max-w-lg bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="h-0.5 w-full bg-gradient-to-r from-brand-accent via-violet-500 to-brand-accent" />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-heading font-black text-xl text-brand-fg">Share Your Experience</h3>
              <p className="text-xs text-brand-fg-muted mt-1">Your review helps others learn about working with Hashir.</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-brand-border text-brand-fg-muted hover:text-brand-fg transition-colors shrink-0 ml-4"
            >
              <X size={15} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center text-center py-8 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center"
                >
                  <CheckCircle size={32} className="text-green-400" />
                </motion.div>
                <div>
                  <p className="font-heading font-bold text-lg text-brand-fg">Thank you, {form.name.split(' ')[0]}!</p>
                  <p className="text-sm text-brand-fg-muted mt-1 max-w-xs">Your review has been submitted and will be reviewed shortly.</p>
                </div>
                <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-full bg-brand-accent text-white text-sm font-semibold">Close</button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={handleSubmit} exit={{ opacity: 0 }} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Full Name <span className="text-brand-accent">*</span></label>
                    <input type="text" placeholder="Jane Smith" value={form.name} onChange={set('name')} className={inputCls('name')} />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Role / Title <span className="text-brand-accent">*</span></label>
                    <input type="text" placeholder="Agency Owner" value={form.role} onChange={set('role')} className={inputCls('role')} />
                    {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Company <span className="text-brand-accent">*</span></label>
                  <input type="text" placeholder="Acme Agency" value={form.company} onChange={set('company')} className={inputCls('company')} />
                  {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Your Rating <span className="text-brand-accent">*</span></label>
                  <StarPicker value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
                  {errors.rating && <p className="text-xs text-red-400 mt-1">{errors.rating}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Your Review <span className="text-brand-accent">*</span></label>
                  <textarea rows={4} placeholder="Share your experience…" value={form.review} onChange={set('review')} className={`${inputCls('review')} resize-none`} />
                  <div className="flex justify-between mt-1">
                    {errors.review ? <p className="text-xs text-red-400">{errors.review}</p> : <span />}
                    <span className={`text-xs ml-auto ${form.review.length < 20 ? 'text-brand-muted' : 'text-brand-fg-muted'}`}>{form.review.length} chars</span>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-accent text-white text-sm font-semibold disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                      Submitting…
                    </>
                  ) : <><Send size={14} /> Submit Review</>}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export default function Testimonials() {
  const [headerRef, inView] = useInView({ threshold: 0.2, once: true })
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const goTo = useCallback((index) => {
    setDirection(index >= active ? 1 : -1)
    setActive(index)
  }, [active])

  const next = useCallback(() => {
    setDirection(1)
    setActive((p) => (p + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive((p) => (p - 1 + testimonials.length) % testimonials.length)
  }, [])

  /* Auto-rotate every 5.5 s, pauses on hover */
  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 5500)
    return () => clearInterval(id)
  }, [paused, next])

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next])

  const t = testimonials[active]
  const total = testimonials.length

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 overflow-hidden relative">
      <AnimatedBg variant="testimonials" />

      {/* Background glow tied to active colour */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <motion.div
          key={t.color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[130px]"
          style={{ backgroundColor: t.color + '10' }}
        />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="mb-12">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
          >
            Social Proof
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-heading font-black leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              What Clients Say
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-5 shrink-0"
            >
              {[
                { value: '100+', label: 'Clients' },
                { value: '5.0★', label: 'Rating' },
                { value: '5+ yrs', label: 'Track Record' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-heading font-black text-lg text-brand-fg leading-none">{s.value}</div>
                  <div className="text-[10px] text-brand-fg-muted uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Spotlight card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative rounded-2xl bg-brand-surface border border-brand-border overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Dynamic colour accent at top */}
          <motion.div
            key={t.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }}
          />

          {/* Ambient glow inside card */}
          <motion.div
            key={`glow-${t.color}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 20% 50%, ${t.color}12, transparent 55%)` }}
          />

          {/* Counter */}
          <div className="absolute top-6 right-6 z-10 font-mono text-[11px] text-brand-fg-muted tabular-nums">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>

          {/* Quote area */}
          <div className="relative z-10 p-8 md:p-12" style={{ minHeight: 280 }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                {/* Opening quote SVG */}
                <svg width="44" height="32" viewBox="0 0 44 32" fill="none" aria-hidden>
                  <path
                    d="M0 32V20.5C0 9.5 5 3 15 0L18.5 5.5C13.5 7.5 10.5 11 10 17H16.5V32H0ZM26 32V20.5C26 9.5 31 3 41 0L44.5 5.5C39.5 7.5 36.5 11 36 17H42.5V32H26Z"
                    fill={t.color}
                    fillOpacity={0.3}
                  />
                </svg>

                {/* Quote */}
                <blockquote className="text-base md:text-lg text-brand-fg leading-relaxed font-medium max-w-2xl">
                  {t.quote}
                </blockquote>

                {/* Author row */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ backgroundColor: t.color + '22', color: t.color }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-brand-fg leading-tight">{t.name}</p>
                      <p className="text-xs text-brand-fg-muted">{t.role} · {t.company}</p>
                    </div>
                  </div>
                  <div className="sm:ml-auto">
                    <Stars count={t.stars} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Auto-play progress bar */}
          <div className="h-[2px] bg-brand-border">
            <motion.div
              key={`${active}-${paused}`}
              className="h-full origin-left"
              style={{ backgroundColor: t.color }}
              initial={{ scaleX: 0 }}
              animate={paused ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 5.5, ease: 'linear' }}
            />
          </div>
        </motion.div>

        {/* ── Navigation ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-4 mt-5"
        >
          {/* Prev */}
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-fg-muted transition-colors shrink-0"
          >
            <ChevronLeft size={18} />
          </motion.button>

          {/* Avatar strip */}
          <div className="flex gap-2 flex-1 overflow-x-auto py-1" style={{ scrollbarWidth: 'none' }}>
            {testimonials.map((item, i) => (
              <motion.button
                key={item.name}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to ${item.name}`}
                title={item.name}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-all duration-200"
                style={{
                  backgroundColor: i === active ? item.color : item.color + '1A',
                  color: i === active ? '#fff' : item.color,
                  border: `1.5px solid ${i === active ? item.color : 'transparent'}`,
                  boxShadow: i === active ? `0 0 14px ${item.color}55` : 'none',
                }}
              >
                {item.initials}
              </motion.button>
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-fg-muted transition-colors shrink-0"
          >
            <ChevronRight size={18} />
          </motion.button>
        </motion.div>

        {/* ── Write a review ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            onClick={() => setModalOpen(true)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-border bg-brand-surface hover:border-brand-accent/50 hover:bg-brand-accent/5 text-sm font-semibold text-brand-fg transition-all duration-200 cursor-pointer"
          >
            <PenLine size={14} className="text-brand-accent" />
            Write a Review
          </motion.button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <TestimonialModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
