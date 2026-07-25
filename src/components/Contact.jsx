import { useRef, useState } from 'react'
import {
  motion, AnimatePresence,
  useMotionValue, useSpring,
} from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Send, CheckCircle2, Mail, ArrowUpRight, ChevronDown } from 'lucide-react'
import AnimatedBg from './AnimatedBg'
import SplitReveal from './SplitReveal'
import { supabase } from '../lib/supabase'
import emailjs from '@emailjs/browser'

const EJS_SERVICE  = 'service_3cwkoxc'
const EJS_TEMPLATE = 'template_4xbj5je'
const EJS_KEY      = 'C_AIb3AH94XZIUfGe'

/* ─── Data ───────────────────────────────────────────────────── */
const STEPS = [
  { n: '01', title: 'Fill the form', desc: 'Takes under 2 minutes.' },
  { n: '02', title: 'I reply personally', desc: 'Response within 24 hours — no bots.' },
  { n: '03', title: 'Quick discovery call', desc: '30 minutes to scope your project.' },
  { n: '04', title: 'We start building', desc: 'Kick off with a clear plan and timeline.' },
]

const TIMEZONES = [
  { value: '', label: 'Select your timezone' },
  { value: 'GMT-8', label: 'GMT−8  ·  Los Angeles, Vancouver' },
  { value: 'GMT-7', label: 'GMT−7  ·  Denver, Phoenix' },
  { value: 'GMT-6', label: 'GMT−6  ·  Chicago, Mexico City' },
  { value: 'GMT-5', label: 'GMT−5  ·  New York, Toronto' },
  { value: 'GMT-4', label: 'GMT−4  ·  Halifax, Caracas' },
  { value: 'GMT-3', label: 'GMT−3  ·  São Paulo, Buenos Aires' },
  { value: 'GMT+0', label: 'GMT+0  ·  London, Dublin' },
  { value: 'GMT+1', label: 'GMT+1  ·  Paris, Berlin, Amsterdam' },
  { value: 'GMT+2', label: 'GMT+2  ·  Cairo, Helsinki' },
  { value: 'GMT+3', label: 'GMT+3  ·  Riyadh, Moscow, Nairobi' },
  { value: 'GMT+4', label: 'GMT+4  ·  Dubai, Abu Dhabi' },
  { value: 'GMT+5', label: 'GMT+5  ·  Karachi, Islamabad' },
  { value: 'GMT+5:30', label: 'GMT+5:30 · India, Sri Lanka' },
  { value: 'GMT+6', label: 'GMT+6  ·  Dhaka, Almaty' },
  { value: 'GMT+7', label: 'GMT+7  ·  Bangkok, Jakarta' },
  { value: 'GMT+8', label: 'GMT+8  ·  Singapore, Hong Kong' },
  { value: 'GMT+9', label: 'GMT+9  ·  Tokyo, Seoul' },
  { value: 'GMT+10', label: 'GMT+10 ·  Sydney, Brisbane' },
  { value: 'GMT+11', label: 'GMT+11 ·  Melbourne (DST)' },
  { value: 'GMT+12', label: 'GMT+12 ·  Auckland, Fiji' },
]

/* ─── Variants ───────────────────────────────────────────────── */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const left = {
  hidden: { opacity: 0, x: -22 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.52, ease: [0.215, 0.61, 0.355, 1] } },
}
const right = {
  hidden: { opacity: 0, x: 22 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.52, ease: [0.215, 0.61, 0.355, 1] } },
}
const up = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.215, 0.61, 0.355, 1] } },
}

/* ─── Field label ────────────────────────────────────────────── */
const Label = ({ htmlFor, children }) => (
  <label
    htmlFor={htmlFor}
    className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-accent"
  >
    {children}
  </label>
)

/* ─── Text / email / tel input ───────────────────────────────── */
function Input({ id, type = 'text', placeholder, value, onChange, required, autoComplete }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      id={id}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-4 py-3.5 rounded-xl bg-brand-bg text-sm text-brand-fg placeholder:text-brand-muted/40 focus:outline-none transition-all duration-200"
      style={{
        border: '1px solid',
        borderColor: focused ? '#2563EB' : 'rgba(255,255,255,0.07)',
        boxShadow: focused ? '0 0 0 3px rgba(37,99,235,0.12)' : 'none',
      }}
    />
  )
}

/* ─── Timezone select ────────────────────────────────────────── */
function TimezoneSelect({ id, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl bg-brand-bg text-sm focus:outline-none transition-all duration-200 cursor-pointer"
        style={{
          border: '1px solid',
          borderColor: focused ? '#2563EB' : 'rgba(255,255,255,0.07)',
          boxShadow: focused ? '0 0 0 3px rgba(37,99,235,0.12)' : 'none',
          color: value ? '#FAFAFA' : '#52525B',
        }}
      >
        {TIMEZONES.map((tz) => (
          <option
            key={tz.value}
            value={tz.value}
            style={{ background: '#18181B', color: '#FAFAFA' }}
          >
            {tz.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-fg-muted pointer-events-none"
      />
    </div>
  )
}

/* ─── Magnetic send button ───────────────────────────────────── */
function SendButton({ submitting }) {
  const btnRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 140, damping: 14 })
  const sy = useSpring(my, { stiffness: 140, damping: 14 })

  const onMove = (e) => {
    if (!btnRef.current || submitting) return
    const r = btnRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left - r.width / 2) * 0.32)
    my.set((e.clientY - r.top - r.height / 2) * 0.32)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <motion.button
      ref={btnRef}
      type="submit"
      disabled={submitting}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative w-full overflow-hidden flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-brand-accent text-white text-sm font-bold tracking-wide shadow-lg shadow-brand-accent/20 disabled:opacity-60 cursor-pointer"
    >
      {/* Shimmer sweep */}
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ['-130%', '230%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
        }}
      />
      <AnimatePresence mode="wait">
        {submitting ? (
          <motion.span
            key="dots"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="flex items-center gap-2"
          >
            Send Message
            <Send size={14} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ─── Main section ───────────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({ threshold: 0.1, once: true })
  const [form, setForm] = useState({
    name: '', email: '', phone: '', timezone: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    await Promise.all([
      supabase.from('contact_submissions').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        timezone: form.timezone || null,
        message: form.message,
      }),
      emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        name:     form.name,
        email:    form.email,
        phone:    form.phone || '—',
        timezone: form.timezone || '—',
        message:  form.message,
      }, EJS_KEY),
    ])
    setStatus('sent')
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 px-6"
    >
      <AnimatedBg variant="contact" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">

        {/* ── Editorial header bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-14 md:mb-20"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-fg-muted">
            Contact
          </span>
          <div className="flex-1 mx-6 h-px bg-brand-border" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-fg-muted">
            05 / 06
          </span>
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: info ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-10"
          >
            {/* Heading */}
            <div>
              <SplitReveal
                text="Let's"
                as="h2"
                className="font-heading font-bold leading-none tracking-tight text-brand-fg"
                style={{ fontSize: 'clamp(3.2rem, 7.5vw, 5.8rem)' }}
              />
              <SplitReveal
                text="Talk."
                as="h2"
                className="font-heading font-bold leading-none tracking-tight text-brand-accent"
                style={{ fontSize: 'clamp(3.2rem, 7.5vw, 5.8rem)' }}
                delay={0.2}
              />
            </div>

            {/* Email */}
            <motion.div variants={left} className="flex flex-col gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-fg-muted">
                Direct email
              </span>
              <motion.a
                href="mailto:support@levelupmarketplace.com"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group inline-flex items-start gap-2.5 text-sm text-brand-fg font-medium hover:text-brand-accent transition-colors duration-200"
              >
                <Mail size={14} className="text-brand-accent mt-0.5 shrink-0" />
                <span className="break-all">support@levelupmarketplace.com</span>
                <ArrowUpRight
                  size={12}
                  className="text-brand-accent mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </motion.a>
            </motion.div>

            {/* How It Works */}
            <motion.div variants={stagger} className="flex flex-col gap-1">
              <motion.p
                variants={up}
                className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-fg-muted mb-5"
              >
                How It Works
              </motion.p>

              {STEPS.map((step, i) => (
                <motion.div
                  key={step.n}
                  variants={left}
                  className="relative flex gap-5 pb-7"
                >
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <motion.div
                      className="absolute left-[10px] top-6 bottom-0 w-px"
                      style={{ background: 'linear-gradient(to bottom, #27272A, transparent)' }}
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={inView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                    />
                  )}

                  <span className="font-mono text-[11px] font-bold text-brand-accent shrink-0 w-5 mt-0.5 leading-none">
                    {step.n}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand-fg leading-snug">{step.title}</p>
                    <p className="text-xs text-brand-fg-muted mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Availability pulse */}
            <motion.div variants={left} className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs text-brand-fg-muted">Available for new projects</span>
            </motion.div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            variants={right}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                /* ── Success ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex flex-col items-center justify-center gap-6 py-24 px-8 text-center rounded-2xl bg-brand-surface border border-brand-border"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 250, damping: 18, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/25 flex items-center justify-center"
                  >
                    <CheckCircle2 size={32} className="text-green-400" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="font-heading font-black text-2xl text-brand-fg mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-brand-fg-muted">
                      I&apos;ll get back to you within 24 hours.
                    </p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => {
                      setStatus('idle')
                      setForm({ name: '', email: '', phone: '', timezone: '', message: '' })
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="text-xs font-semibold text-brand-accent underline underline-offset-2 cursor-pointer"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="relative rounded-2xl bg-brand-surface border border-brand-border p-8 md:p-10 flex flex-col gap-6 overflow-hidden"
                >
                  {/* Accent line at top */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

                  {/* Corner glow */}
                  <div className="absolute top-0 right-0 w-56 h-56 bg-brand-accent/5 blur-[70px] rounded-full pointer-events-none" />

                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="relative z-10 flex flex-col gap-6"
                  >
                    {/* Row 1: Name + Phone */}
                    <motion.div variants={up} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name" required placeholder="John Smith"
                          value={form.name} onChange={set('name')} autoComplete="name"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone" type="tel" placeholder="+1 (555) 000-0000"
                          value={form.phone} onChange={set('phone')} autoComplete="tel"
                        />
                      </div>
                    </motion.div>

                    {/* Row 2: Email + Timezone */}
                    <motion.div variants={up} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email" type="email" required placeholder="you@company.com"
                          value={form.email} onChange={set('email')} autoComplete="email"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="timezone">Your Timezone *</Label>
                        <TimezoneSelect
                          id="timezone" required
                          value={form.timezone} onChange={set('timezone')}
                        />
                      </div>
                    </motion.div>

                    {/* Row 3: Message */}
                    <motion.div variants={up} className="flex flex-col gap-2">
                      <Label htmlFor="message">Message *</Label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Tell me about your project, goals, and timeline..."
                        className="w-full px-4 py-3.5 rounded-xl bg-brand-bg text-sm text-brand-fg placeholder:text-brand-muted/40 focus:outline-none transition-all duration-200"
                        style={{ resize: 'none', border: '1px solid rgba(255,255,255,0.07)' }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2563EB'
                          e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.07)'
                          e.target.style.boxShadow = 'none'
                        }}
                      />
                    </motion.div>

                    {/* Submit */}
                    <motion.div variants={up}>
                      <SendButton submitting={status === 'sending'} />
                    </motion.div>

                    <motion.p
                      variants={up}
                      className="text-center text-[11px] text-brand-fg-muted"
                    >
                      No spam · I reply personally · Within 24 hours
                    </motion.p>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
