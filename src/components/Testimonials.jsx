import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { X, Star, Send, CheckCircle, PenLine, ChevronLeft, ChevronRight } from 'lucide-react'
import SplitReveal from './SplitReveal'
import { supabase } from '../lib/supabase'

/* ─── Seed data ──────────────────────────────────────────────── */
const testimonials = [
  { quote: "Hashir completely transformed how our agency handles client onboarding. The GHL workflows he built cut our setup time from days to under 2 hours.", name: 'Marcus Webb', role: 'Agency Owner', company: 'WebScale Digital', initials: 'MW', color: '#2563EB', stars: 5 },
  { quote: "We had a complex multi-location restaurant setup that no one could crack. Hashir figured it out in a single session and built a full ordering flow.", name: 'Priya Nair', role: 'Operations Director', company: 'Spice Garden Group', initials: 'PN', color: '#059669', stars: 5 },
  { quote: "The white-label CRM setup from WLCRM made it so easy to launch our own branded product. Hashir's team handled everything: snapshots, onboarding, support docs.", name: 'Jordan Ellis', role: 'SaaS Founder', company: 'NexusGrow', initials: 'JE', color: '#7C3AED', stars: 5 },
  { quote: "I've worked with a lot of GHL experts but Hashir operates at a different level. Our AI follow-up bot has a 38% reply rate. That's insane.", name: 'Tariq Osman', role: 'Marketing Director', company: 'LeadFlow Agency', initials: 'TO', color: '#D97706', stars: 5 },
  { quote: "Reached out to Level Up Marketplace after being stuck on a custom webhook integration for two weeks. Hashir resolved it in 45 minutes with a full explanation.", name: 'Sophie Laurent', role: 'Freelance Developer', company: 'Independent', initials: 'SL', color: '#0891B2', stars: 5 },
  { quote: "Our reporting dashboard went from zero to fully automated in under a week. The custom GHL reporting Hashir built now saves our team 10+ hours a month.", name: 'Derek Hutchinson', role: 'Head of Client Success', company: 'Elevate Agency', initials: 'DH', color: '#DC2626', stars: 5 },
  { quote: "Hashir built our entire sub-account architecture from scratch. What would have taken us months took three weeks. He thinks in systems.", name: 'Aisha Kamara', role: 'Co-Founder', company: 'BrightPath CRM', initials: 'AK', color: '#DB2777', stars: 5 },
  { quote: "Brought Hashir in to audit our HighLevel setup and within the first call he found 4 critical gaps we didn't know existed.", name: 'Luca Ferretti', role: 'Technical Lead', company: 'Growth Partners', initials: 'LF', color: '#0891B2', stars: 5 },
  { quote: "Hashir has been extremely helpful, answering questions, mediating with the Dev Team, and being by our side on every doubt and issue. I don't think we could have a better Support experience.", name: 'Oscar Arrieta', role: 'CRM Specialist', company: 'Blue Ridge Media', initials: 'OA', color: '#2563EB', stars: 5 },
  { quote: "Hashir was great! He followed up with me as promised and walked me through my issue step by step.", name: "Lennett O'Neal", role: 'Client', company: 'Prime Step AI', initials: 'LO', color: '#7C3AED', stars: 5 },
]

const ACCENT_COLORS = ['#2563EB','#7C3AED','#DC2626','#D97706','#0891B2','#059669','#F59E0B','#EC4899','#0EA5E9']
const LS_KEY = 'hashir_reviews_cache'
const lsGet = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] } }
const lsSet = (arr) => { try { localStorage.setItem(LS_KEY, JSON.stringify(arr)) } catch {} }

/* ─── Stars ──────────────────────────────────────────────────── */
function Stars({ count = 5, size = 14 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20" fill="#FBBF24">
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
      {[1,2,3,4,5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)}
          className="p-0.5 focus:outline-none" aria-label={`${n} star`}>
          <Star size={24} className="transition-colors duration-100"
            fill={(hovered || value) >= n ? '#FBBF24' : 'none'}
            stroke={(hovered || value) >= n ? '#FBBF24' : '#3F3F46'} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  )
}

/* ─── Review modal ───────────────────────────────────────────── */
function ReviewModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ name:'', role:'', company:'', review:'', rating:0 })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim())   e.name = 'Required'
    if (!form.role.trim())   e.role = 'Required'
    if (!form.company.trim()) e.company = 'Required'
    if (!form.review.trim()) e.review = 'Required'
    else if (form.review.trim().length < 20) e.review = 'At least 20 characters'
    if (!form.rating)        e.rating = 'Please select a rating'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setStatus('submitting')
    await onSubmit(form); setStatus('success')
  }

  const cls = (k) =>
    `w-full bg-brand-bg border rounded-xl px-4 py-3 text-sm text-brand-fg placeholder-brand-muted outline-none transition-colors duration-200 focus:border-brand-accent ${errors[k] ? 'border-red-500/70' : 'border-brand-border'}`

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor:'rgba(0,0,0,0.8)', backdropFilter:'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <motion.div initial={{ opacity:0, scale:0.94, y:24 }} animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.94, y:24 }} transition={{ duration:0.3, ease:[0.215,0.61,0.355,1] }}
        className="relative w-full max-w-lg bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="h-0.5 w-full bg-gradient-to-r from-brand-accent via-violet-500 to-brand-accent" />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-heading font-bold text-xl text-brand-fg">Share Your Experience</h3>
              <p className="text-xs text-brand-fg-muted mt-1">Your review helps others learn about working with Hashir.</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full border border-brand-border text-brand-fg-muted hover:text-brand-fg transition-colors shrink-0 ml-4"><X size={15} /></button>
          </div>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div key="success" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                className="flex flex-col items-center text-center py-8 gap-4">
                <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                  transition={{ type:'spring', stiffness:260, damping:18, delay:0.1 }}
                  className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-400" />
                </motion.div>
                <div>
                  <p className="font-heading font-bold text-lg text-brand-fg">Thank you, {form.name.split(' ')[0]}!</p>
                  <p className="text-sm text-brand-fg-muted mt-1">Your review has been submitted.</p>
                </div>
                <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-full bg-brand-accent text-white text-sm font-semibold">Close</button>
              </motion.div>
            ) : (
              <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <input type="text" placeholder="Jane Smith" value={form.name} onChange={set('name')} className={cls('name')} />
                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Role *</label>
                    <input type="text" placeholder="Agency Owner" value={form.role} onChange={set('role')} className={cls('role')} />
                    {errors.role && <p className="text-xs text-red-400 mt-1">{errors.role}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Company *</label>
                  <input type="text" placeholder="Acme Agency" value={form.company} onChange={set('company')} className={cls('company')} />
                  {errors.company && <p className="text-xs text-red-400 mt-1">{errors.company}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Rating *</label>
                  <StarPicker value={form.rating} onChange={v => setForm(f => ({ ...f, rating:v }))} />
                  {errors.rating && <p className="text-xs text-red-400 mt-1">{errors.rating}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-brand-fg-muted mb-1.5 uppercase tracking-wider">Your Review *</label>
                  <textarea rows={4} placeholder="Share your experience…" value={form.review} onChange={set('review')} className={`${cls('review')} resize-none`} />
                  {errors.review && <p className="text-xs text-red-400 mt-1">{errors.review}</p>}
                </div>
                <motion.button type="submit" disabled={status === 'submitting'}
                  whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                  className="mt-1 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-accent text-white text-sm font-semibold disabled:opacity-60">
                  {status === 'submitting'
                    ? <motion.span animate={{ rotate:360 }} transition={{ duration:0.8, repeat:Infinity, ease:'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full inline-block" />
                    : <><Send size={14} /> Submit Review</>}
                </motion.button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Auto-progress bar ──────────────────────────────────────── */
function ProgressBar({ duration, running, key: k }) {
  return (
    <div className="h-px bg-brand-border overflow-hidden rounded-full">
      {running && (
        <motion.div
          key={k}
          className="h-full bg-brand-accent rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration, ease: 'linear' }}
        />
      )}
    </div>
  )
}

/* ─── Editorial testimonial slider ───────────────────────────── */
function TestimonialSlider({ list }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  const [playing, setPlaying] = useState(true)
  const AUTO_MS = 5500
  const timerRef = useRef(null)

  const go = useCallback((next, direction) => {
    setDir(direction)
    setIdx(((next % list.length) + list.length) % list.length)
    setPlaying(false)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setPlaying(true), 60)
  }, [list.length])

  const prev = () => go(idx - 1, -1)
  const next = () => go(idx + 1, 1)

  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => go(idx + 1, 1), AUTO_MS)
    return () => clearTimeout(id)
  }, [idx, playing, go])

  const item = list[idx]
  const pad2 = (n) => String(n + 1).padStart(2, '0')

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, filter: 'blur(8px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit:  (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, filter: 'blur(8px)' }),
  }

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 rounded-2xl border border-brand-border overflow-hidden">

      {/* Left panel — meta */}
      <div className="flex flex-col justify-between p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-brand-border bg-brand-surface/40">
        {/* Index */}
        <div>
          <div className="flex items-baseline gap-2 mb-6">
            <span
              className="font-heading font-black leading-none"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', color: item.color }}
            >
              {pad2(idx)}
            </span>
            <span className="text-brand-fg-muted text-lg font-medium">/ {pad2(list.length - 1)}</span>
          </div>
          <div className="h-px bg-brand-border mb-6" />

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col gap-3"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: item.color + '22', color: item.color }}
              >
                {item.initials}
              </div>
              <div>
                <p className="font-heading font-bold text-brand-fg text-base leading-tight">{item.name}</p>
                <p className="text-xs text-brand-fg-muted mt-0.5">{item.role}</p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: item.color + 'CC' }}>{item.company}</p>
              </div>
              <Stars count={item.stars} size={13} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav + progress */}
        <div className="flex flex-col gap-4 mt-8">
          <ProgressBar duration={AUTO_MS / 1000} running={playing} key={`${idx}-${playing}`} />
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-accent/60 transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-accent/60 transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
            {/* Dot indicators */}
            <div className="flex items-center gap-1 ml-2 flex-wrap max-w-[120px]">
              {list.slice(0, 10).map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i, i > idx ? 1 : -1)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? 16 : 6,
                    height: 6,
                    backgroundColor: i === idx ? item.color : 'rgba(255,255,255,0.15)',
                  }}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — quote */}
      <div className="relative flex flex-col justify-center p-8 lg:p-12 overflow-hidden min-h-[320px]">
        {/* Background glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none transition-all duration-700"
          style={{ backgroundColor: item.color + '0C' }}
        />

        {/* Giant quote mark */}
        <div
          aria-hidden
          className="absolute top-4 left-8 font-heading font-black leading-none select-none pointer-events-none"
          style={{ fontSize: 'clamp(6rem, 12vw, 10rem)', color: item.color + '12', lineHeight: 1 }}
        >
          ❝
        </div>

        {/* Quote text */}
        <AnimatePresence custom={dir} mode="wait">
          <motion.blockquote
            key={`quote-${idx}`}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative z-10 font-heading font-semibold text-brand-fg leading-snug"
            style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.65rem)' }}
          >
            &ldquo;{item.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-8 h-[2px] rounded-full mt-8"
          style={{ backgroundColor: item.color }}
          animate={{ width: '60px' }}
          key={`line-${idx}`}
          initial={{ width: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </div>
    </div>
  )
}

/* ─── Main section ───────────────────────────────────────────── */
export default function Testimonials() {
  const [headerRef, inView] = useInView({ threshold: 0.2, once: true })
  const [list, setList] = useState(testimonials)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    supabase.from('reviews').select('*').order('created_at', { ascending: true })
      .then(({ data, error }) => {
        if (data && data.length > 0) { lsSet(data); setList([...testimonials, ...data]) }
        else if (error || !data) { const c = lsGet(); if (c.length > 0) setList([...testimonials, ...c]) }
      })
  }, [])

  const addReview = useCallback(async (form) => {
    const initials = form.name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
    const color = ACCENT_COLORS[list.length % ACCENT_COLORS.length]
    const item = { quote: form.review.trim(), name: form.name.trim(), role: form.role.trim(), company: form.company.trim(), initials, color, stars: form.rating }
    await supabase.from('reviews').insert(item)
    lsSet([...lsGet(), item])
    setList(prev => [...prev, item])
  }, [list.length])

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 relative overflow-hidden">

      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity:0, x:-10 }} animate={inView ? { opacity:1, x:0 } : {}}
              transition={{ duration:0.4 }}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
            >
              Social Proof
            </motion.p>
            <SplitReveal
              text="What Clients Say"
              className="font-heading font-bold leading-tight text-brand-fg"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
            />
          </div>

          <div className="flex items-center gap-5 shrink-0">
            <motion.div
              initial={{ opacity:0, y:10 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.5, delay:0.2 }}
              className="flex items-center gap-4"
            >
              {[{ value:'15+', label:'Reviews' }, { value:'5.0★', label:'Rating' }].map(s => (
                <div key={s.label} className="text-center">
                  <div className="font-heading font-bold text-lg text-brand-fg leading-none">{s.value}</div>
                  <div className="text-[10px] text-brand-fg-muted uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.button
              onClick={() => setModalOpen(true)}
              initial={{ opacity:0, y:10 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ duration:0.5, delay:0.3 }}
              whileHover={{ scale:1.04, y:-2 }} whileTap={{ scale:0.97 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-brand-border bg-brand-surface hover:border-brand-accent/50 transition-colors text-sm font-semibold text-brand-fg cursor-pointer"
            >
              <PenLine size={13} className="text-brand-accent" />
              Leave a Review
            </motion.button>
          </div>
        </div>
      </div>

      {/* Editorial slider */}
      <motion.div
        initial={{ opacity:0, y:40 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.7, ease:[0.215,0.61,0.355,1] }}
        className="max-w-7xl mx-auto"
      >
        <TestimonialSlider list={list} />
      </motion.div>

      <AnimatePresence>
        {modalOpen && <ReviewModal onClose={() => setModalOpen(false)} onSubmit={addReview} />}
      </AnimatePresence>
    </section>
  )
}
