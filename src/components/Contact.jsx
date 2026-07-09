import { useRef, useState } from 'react'
import {
  motion, AnimatePresence,
  useMotionValue, useSpring, useScroll, useTransform,
} from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, Send, CheckCircle2, Clock, Globe2, Zap, ArrowRight } from 'lucide-react'
import AnimatedBg from './AnimatedBg'

/* ─── Animation variants ─────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] } },
}
const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] } },
}
const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.215, 0.61, 0.355, 1] } },
}

const trustItems = [
  { icon: Clock, label: '< 24h', sub: 'Average response time' },
  { icon: Globe2, label: '3 Zones', sub: 'UK · USA · Australia' },
  { icon: Zap, label: '5+ Years', sub: 'GHL experience' },
]

/* ─── Magnetic submit button ─────────────────────────────────── */
function MagneticSendButton({ submitting }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15 })
  const sy = useSpring(y, { stiffness: 150, damping: 15 })

  const onMove = (e) => {
    if (submitting) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      type="submit"
      disabled={submitting}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="relative w-full overflow-hidden flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-brand-accent text-white text-sm font-bold tracking-wide shadow-xl shadow-brand-accent/25 disabled:opacity-70"
    >
      {/* Shimmer sweep */}
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        animate={{ x: ['-120%', '220%'] }}
        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)' }}
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
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2"
          >
            <Send size={15} />
            Send Message
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ─── Floating-label field ───────────────────────────────────── */
function Field({ label, id, required, as: Tag = 'input', value, style: extraStyle = {}, ...rest }) {
  const [focused, setFocused] = useState(false)
  const filled = String(value).length > 0

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={{
          y: focused || filled ? -20 : 0,
          scale: focused || filled ? 0.78 : 1,
          color: focused ? '#2563EB' : '#A1A1AA',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute left-4 top-3.5 text-sm font-medium pointer-events-none"
        style={{ transformOrigin: 'left center' }}
      >
        {label}
        {required && <span style={{ color: '#2563EB' }}> *</span>}
      </motion.label>

      <Tag
        id={id}
        required={required}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full px-4 pt-7 pb-2.5 rounded-xl bg-brand-bg text-sm text-brand-fg placeholder:text-brand-muted focus:outline-none transition-shadow duration-200"
        style={{
          ...extraStyle,
          border: '1px solid',
          borderColor: focused ? '#2563EB' : '#27272A',
          boxShadow: focused ? '0 0 0 3px rgba(37,99,235,0.14)' : 'none',
        }}
        {...rest}
      />
    </div>
  )
}

/* ─── Main section ───────────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null)
  const [ref, inView] = useInView({ threshold: 0.1, once: true })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    }, 1800)
  }

  const words = "Let's Build Something Great.".split(' ')

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32 px-6 bg-brand-surface/20"
    >
      <AnimatedBg variant="contact" />

      {/* Parallax glow blob */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/6 blur-[120px] rounded-full" />
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent mb-5"
          >
            Get In Touch
          </motion.p>

          {/* Split-word heading */}
          <motion.h2
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="font-heading font-black leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
          >
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                className="inline-block mr-[0.22em] last:mr-0"
              >
                {word === 'Great.' ? (
                  <span className="text-brand-accent">{word}</span>
                ) : word}
              </motion.span>
            ))}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-brand-fg-muted mt-5 max-w-xl mx-auto text-sm leading-relaxed"
          >
            Whether you need GHL automation, custom CRM development, or want to explore partnerships —
            I&apos;m always open to a conversation.
          </motion.p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* ── Left panel ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-8"
          >
            {/* Email block */}
            <motion.div variants={fadeLeft}>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-fg-muted mb-3 font-semibold">Direct email</p>
              <motion.a
                href="mailto:support@levelupmarketplace.com"
                className="group inline-block"
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-center gap-3 mb-1">
                  <motion.div
                    whileHover={{ rotate: -15, scale: 1.2 }}
                    className="w-9 h-9 rounded-xl bg-brand-accent/10 flex items-center justify-center"
                  >
                    <Mail size={16} className="text-brand-accent" />
                  </motion.div>
                  <span className="font-heading font-black text-brand-fg text-lg md:text-xl break-all group-hover:text-brand-accent transition-colors duration-200">
                    support@levelupmarketplace.com
                  </span>
                </div>
                <motion.div
                  className="h-[2px] rounded-full bg-brand-accent origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>

            {/* Trust signals */}
            <motion.div variants={fadeLeft} className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-fg-muted font-semibold">Why work with me</p>
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeLeft}
                  whileHover={{ x: 8, backgroundColor: 'rgba(37,99,235,0.06)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-brand-border bg-brand-surface cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-brand-accent" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-brand-fg text-sm">{item.label}</p>
                    <p className="text-xs text-brand-fg-muted">{item.sub}</p>
                  </div>
                  <motion.div
                    className="ml-auto opacity-0 group-hover:opacity-100"
                    whileHover={{ x: 4 }}
                  >
                    <ArrowRight size={14} className="text-brand-accent" />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Available badge */}
            <motion.div
              variants={fadeLeft}
              className="flex items-center gap-3 p-4 rounded-xl border border-green-500/20 bg-green-500/5"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <p className="text-sm text-green-400 font-semibold">Available for new projects right now</p>
            </motion.div>
          </motion.div>

          {/* ── Right panel: Form ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative rounded-2xl border border-brand-border bg-brand-surface overflow-hidden"
          >
            {/* Animated top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent" />

            {/* Glow in corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-accent/6 blur-[60px] rounded-full pointer-events-none" />

            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
                  className="relative z-10 flex flex-col items-center justify-center gap-5 py-20 px-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center"
                  >
                    <CheckCircle2 size={40} className="text-green-400" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <h3 className="font-heading font-black text-2xl text-brand-fg mb-2">Message Sent!</h3>
                    <p className="text-sm text-brand-fg-muted max-w-xs">
                      Thanks for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setStatus('idle')}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="mt-2 text-xs font-semibold text-brand-accent underline underline-offset-2"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                /* ── Form state ── */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="relative z-10 p-7 md:p-8"
                >
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="flex flex-col gap-5"
                  >
                    <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field
                        id="name"
                        label="Your name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                      />
                      <Field
                        id="email"
                        label="Email address"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                      />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <Field
                        as="textarea"
                        id="message"
                        label="Your message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell me about your project..."
                        style={{ resize: 'none' }}
                      />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <MagneticSendButton submitting={status === 'sending'} />
                    </motion.div>

                    <motion.p
                      variants={fadeUp}
                      className="text-center text-[11px] text-brand-fg-muted"
                    >
                      No spam. Replies within 24 hours.
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
