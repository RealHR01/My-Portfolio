import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { X, Star, Send, CheckCircle, PenLine } from 'lucide-react'

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
    name: 'Lennett O\'Neal',
    role: 'Client',
    company: 'Prime Step AI',
    initials: 'LO',
    color: '#7C3AED',
    stars: 5,
  },
]

const row1 = testimonials.slice(0, 6)
const row2 = testimonials.slice(6)

// ─── Star rating picker ───────────────────────────────────────────────────────
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

// ─── Testimonial form modal ───────────────────────────────────────────────────
function TestimonialModal({ onClose }) {
  const [form, setForm] = useState({ name: '', role: '', company: '', review: '', rating: 0 })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success

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
    // Simulate async submission — wire up to your backend or Formspree here
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('success')
  }

  const inputCls = (key) =>
    `w-full bg-brand-bg border rounded-xl px-4 py-3 text-sm text-brand-fg placeholder-brand-muted outline-none transition-colors duration-200 focus:border-brand-accent ${
      errors[key] ? 'border-red-500/70' : 'border-brand-border hover:border-brand-muted'
    }`

  return (
    // Backdrop
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        className="relative w-full max-w-lg bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Top accent strip */}
        <div className="h-0.5 w-full bg-gradient-to-r from-brand-accent via-violet-500 to-brand-accent" />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-heading font-black text-xl text-brand-fg">Share Your Experience</h3>
              <p className="text-xs text-brand-fg-muted mt-1">Your review helps others learn about working with Hashir.</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-brand-border text-brand-fg-muted hover:text-brand-fg hover:border-brand-muted transition-colors shrink-0 ml-4"
            >
              <X size={15} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              // ── Success state ──
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
                  <p className="text-sm text-brand-fg-muted mt-1 max-w-xs">
                    Your review has been submitted and will be reviewed shortly.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-semibold transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              // ── Form ──
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
                noValidate
              >
                {/* Name + Role row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">
                      Full Name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={set('name')}
                      className={inputCls('name')}
                    />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">
                      Role / Title <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Agency Owner"
                      value={form.role}
                      onChange={set('role')}
                      className={inputCls('role')}
                    />
                    {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>}
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">
                    Company <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Agency"
                    value={form.company}
                    onChange={set('company')}
                    className={inputCls('company')}
                  />
                  {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">
                    Your Rating <span className="text-brand-accent">*</span>
                  </label>
                  <StarPicker value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
                  {errors.rating && <p className="text-xs text-red-400 mt-1">{errors.rating}</p>}
                </div>

                {/* Review */}
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">
                    Your Review <span className="text-brand-accent">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your experience working with Hashir…"
                    value={form.review}
                    onChange={set('review')}
                    className={`${inputCls('review')} resize-none leading-relaxed`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {errors.review
                      ? <p className="text-xs text-red-400">{errors.review}</p>
                      : <span />}
                    <span className={`text-xs ml-auto ${form.review.length < 20 ? 'text-brand-muted' : 'text-brand-fg-muted'}`}>
                      {form.review.length} chars
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-semibold transition-colors shadow-lg shadow-brand-accent/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block"
                      />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Submit Review
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Display helpers ──────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative shrink-0 w-[340px] rounded-2xl border p-6 cursor-default transition-all duration-300 overflow-hidden"
      animate={{
        borderColor: hovered ? t.color + '50' : '#27272A',
        backgroundColor: hovered ? t.color + '08' : '#18181B',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(300px circle at 50% 0%, ${t.color}15, transparent 70%)` }}
      />
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Stars count={t.stars} />
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
        </div>
        <p className="text-sm text-brand-fg-muted leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
        <div className="flex items-center gap-3 pt-1 border-t border-brand-border">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: t.color + '25', color: t.color }}
          >
            {t.initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-brand-fg leading-tight">{t.name}</div>
            <div className="text-xs text-brand-fg-muted">{t.role} · {t.company}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ScrollRow({ items, reverse = false, speed = 35 }) {
  const doubled = [...items, ...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-4"
        animate={{ x: reverse ? ['0%', `${100 / 3}%`] : ['0%', `-${100 / 3}%`] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Testimonials() {
  const sectionRef = useRef(null)
  const [headerRef, inView] = useInView({ threshold: 0.2, once: true })
  const [modalOpen, setModalOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 overflow-hidden relative">
      {/* Parallax bg glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brand-accent/5 blur-[120px] rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
          >
            Social Proof
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-heading font-black leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              What Clients Say
            </motion.h2>

            {/* Write a Testimonial button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-brand-border bg-brand-surface hover:border-brand-accent/50 hover:bg-brand-accent/5 text-sm font-semibold text-brand-fg transition-all duration-200 shrink-0 self-start sm:self-auto"
            >
              <PenLine size={14} className="text-brand-accent" />
              Write a Review
            </motion.button>
          </div>
        </div>
      </div>

      {/* Two-row infinite scroll */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none" />
          <ScrollRow items={row1} reverse={false} speed={40} />
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none" />
          <ScrollRow items={row2} reverse={true} speed={36} />
        </div>
      </div>

      {/* Bottom stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-14 flex justify-center"
      >
        <div className="flex items-center gap-6 px-8 py-4 rounded-2xl border border-brand-border bg-brand-surface/60 backdrop-blur-sm">
          {[
            { value: '100+', label: 'Happy Clients' },
            { value: '5.0', label: 'Avg. Rating' },
            { value: '3 yrs', label: 'Track Record' },
          ].map((stat, i) => (
            <div key={stat.label} className={`text-center ${i > 0 ? 'pl-6 border-l border-brand-border' : ''}`}>
              <div className="font-heading font-black text-xl text-brand-fg">{stat.value}</div>
              <div className="text-[10px] text-brand-fg-muted uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <TestimonialModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
