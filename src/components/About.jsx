import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Building2, Globe, ShoppingBag, MapPin, ArrowUpRight, Zap } from 'lucide-react'
import AnimatedBg from './AnimatedBg'
import SplitReveal from './SplitReveal'
import { useInView } from '../hooks/useInView'

const stats = [
  { number: 5, suffix: '+', label: 'Years in\nHighLevel' },
  { number: 100, suffix: '+', label: 'Agencies\nServed' },
  { number: 3, suffix: '', label: 'Active\nVentures' },
  { number: 47, suffix: '+', label: 'Step GHL\nWorkflows' },
]

function Counter({ target, suffix, running }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!running) return
    const step = Math.ceil(target / 40)
    let cur = 0
    const id = setInterval(() => {
      cur = Math.min(cur + step, target)
      setCount(cur)
      if (cur >= target) clearInterval(id)
    }, 35)
    return () => clearInterval(id)
  }, [running, target])
  return <span className="tabular-nums">{count}{suffix}</span>
}

function StatsStrip() {
  const [ref, inView] = useInView({ threshold: 0.4, once: true })
  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-16 rounded-2xl border border-brand-border overflow-hidden">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative flex flex-col items-center justify-center py-8 px-4 text-center"
          style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(39,39,42,1)' : 'none' }}
        >
          {i % 2 === 0 && <div className="absolute inset-0 bg-brand-accent/[0.02] pointer-events-none" />}
          <div
            className="font-heading font-black leading-none mb-2"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: '#FAFAFA' }}
          >
            <Counter target={s.number} suffix={s.suffix} running={inView} />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-fg-muted whitespace-pre-line leading-snug">
            {s.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

const roles = [
  { icon: Building2, company: 'Level Up Marketplace', role: 'Support Head', color: '#2563EB', tag: 'Full-time' },
  { icon: Globe,     company: 'White Label Your CRM',  role: 'Founder',      color: '#7C3AED', tag: 'Startup'   },
  { icon: ShoppingBag, company: 'Get Online Orders',   role: 'Founder',      color: '#059669', tag: 'Startup'   },
]

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.215, 0.61, 0.355, 1] },
  }),
}

/* ── Mouse-parallax glow card ────────────────────────────────── */
function GlowCard({ children, className, custom, color = '#2563EB' }) {
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { damping: 22, stiffness: 160 })
  const y = useSpring(rawY, { damping: 22, stiffness: 160 })

  const move = (e) => {
    const r = cardRef.current.getBoundingClientRect()
    rawX.set(e.clientX - r.left - r.width / 2)
    rawY.set(e.clientY - r.top - r.height / 2)
  }
  const leave = () => { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={cardRef}
      custom={custom}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={{ y: -4, borderColor: color + '44' }}
      onMouseMove={move}
      onMouseLeave={leave}
      transition={{ border: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-2xl bg-brand-surface border border-brand-border cursor-default ${className}`}
    >
      {/* Tracked glow */}
      <motion.div
        aria-hidden
        className="absolute w-72 h-72 rounded-full blur-[80px] pointer-events-none"
        style={{ x, y, backgroundColor: color + '18', top: '-50%', left: '-20%' }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32 px-6">
      <AnimatedBg variant="about" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3">The Person</p>
          <SplitReveal
            text="Who I Am"
            className="font-heading font-bold leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          />
        </motion.div>

        {/* ── Stats strip ── */}
        <StatsStrip />

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* [1] Identity — spans 2 cols */}
          <GlowCard custom={0} color="#2563EB" className="md:col-span-2 min-h-[280px]">
            <div className="p-8 md:p-10 flex flex-col justify-between h-full gap-8">
              <div>
                <p className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-brand-accent mb-4">Philosophy</p>
                <p className="font-heading font-black text-2xl md:text-3xl text-brand-fg leading-tight">
                  "Anyone can click through the GHL UI.<br className="hidden md:block" />
                  Building the architecture underneath.<br className="hidden md:block" />
                  <span className="text-brand-accent">That's the work.</span>"
                </p>
              </div>
              <p className="text-brand-fg-muted leading-relaxed max-w-lg">
                I start with the real bottleneck, not the symptom. Then I build a system that removes it permanently.
                A 47-step GHL workflow, a custom React dashboard, an AI agent for tier-1 support: whatever the job needs.
                I stay in the details until it works.
              </p>
            </div>
          </GlowCard>

          {/* [2] Currently building */}
          <GlowCard custom={1} color="#7C3AED" className="min-h-[280px]">
            <div className="p-6 flex flex-col gap-4 h-full">
              <p className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-brand-fg-muted">Currently Building</p>
              <div className="flex flex-col gap-3 flex-1">
                {roles.map((r, i) => (
                  <motion.div
                    key={r.company}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-brand-border/60 hover:border-brand-border transition-colors duration-200"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: r.color + '1A', color: r.color }}
                    >
                      <r.icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-brand-fg truncate">{r.company}</p>
                      <p className="text-[10px] font-medium" style={{ color: r.color }}>{r.role}</p>
                    </div>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: r.color + '18', color: r.color }}
                    >
                      {r.tag}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlowCard>

          {/* [3] Origin story */}
          <GlowCard custom={2} color="#059669" className="min-h-[200px]">
            <div className="p-6 flex flex-col gap-3 h-full">
              <p className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-brand-fg-muted">The Story</p>
              <p className="text-sm text-brand-fg-muted leading-relaxed flex-1">
                Got into GHL support in 2019, solving tickets. Two years later I was designing full agency systems from scratch.
                Now I run support at one of GHL&apos;s top marketplaces and ship products used by hundreds of agencies. Five years in. Still the person they call when it breaks.
              </p>
              <div className="flex items-center gap-2">
                <Zap size={13} className="text-brand-accent" />
                <span className="text-xs text-brand-fg-muted font-medium">5 yrs deep · still in the details</span>
              </div>
            </div>
          </GlowCard>

          {/* [4] Based in */}
          <GlowCard custom={3} color="#0891B2" className="min-h-[200px]">
            <div className="p-6 flex flex-col justify-between h-full">
              <p className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-brand-fg-muted">Based In</p>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={16} className="text-brand-accent" />
                  <p className="font-heading font-black text-2xl text-brand-fg">Pakistan</p>
                </div>
                <p className="text-sm text-brand-fg-muted ml-6">GMT+5 · Available globally</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-brand-fg-muted">Open to remote collaborations</span>
              </div>
            </div>
          </GlowCard>

          {/* [5] CTA */}
          <GlowCard custom={4} color="#2563EB" className="min-h-[200px]">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col justify-between h-full p-6 cursor-pointer"
            >
              <p className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-brand-fg-muted">Let&apos;s Work</p>
              <div>
                <p className="font-heading font-black text-2xl text-brand-fg leading-tight mb-2">A GHL problem<br />nobody solved?</p>
                <p className="text-sm text-brand-fg-muted">Bring it. That&apos;s exactly what I do.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center self-end">
                <ArrowUpRight size={18} className="text-white" />
              </div>
            </motion.a>
          </GlowCard>

        </div>
      </div>
    </section>
  )
}
