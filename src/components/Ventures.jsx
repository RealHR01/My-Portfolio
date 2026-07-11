import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { useState, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import AnimatedBg from './AnimatedBg'

const ventures = [
  {
    number: '01',
    name: 'White Label Your CRM',
    abbr: 'WLCRM',
    href: 'https://whitelabelyourcrm.com/',
    accent: '#2563EB',
    tagline: 'Expert GoHighLevel virtual assistance for agencies',
    description:
      'We provide white-label GHL support to agencies — building complex workflows, onboarding clients under the agency brand, and delivering 24/7 dedicated assistance so agencies can scale without hiring in-house.',
    stack: ['GoHighLevel', 'AI Agents', 'MCP Servers', 'A2P Verification', 'White Label', 'Automation'],
    features: [
      'Workflow automation & funnel building',
      'White-label client onboarding',
      'CRM & pipeline optimization',
      'A2P verification & compliance',
      'AI Agents & MCP Server integrations',
      '24/7 dedicated GHL support',
    ],
  },
  {
    number: '02',
    name: 'Get Online Orders',
    abbr: 'GOO',
    href: 'https://getonlineorders.com/',
    accent: '#059669',
    tagline: 'Online ordering system for local restaurants & retailers',
    description:
      'An end-to-end digital ordering platform for local businesses — custom menus, branded checkout flows, automated confirmations, and real-time order management, all powered by HighLevel.',
    stack: ['HighLevel', 'Custom Checkout', 'Payment Gateways', 'Automation', 'SMS & Email'],
    features: [
      'Custom ordering pages & menus',
      'Branded checkout flows',
      'Automated order confirmations',
      'Payment gateway integrations',
      'Real-time order management',
      'SMS & email order notifications',
    ],
  },
]

function VentureCard({ venture, index }) {
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const glowX = useSpring(rawX, { damping: 22, stiffness: 150 })
  const glowY = useSpring(rawY, { damping: 22, stiffness: 150 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    rawX.set(e.clientX - rect.left - rect.width / 2)
    rawY.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleMouseLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); handleMouseLeave() }}
      onMouseMove={handleMouseMove}
      className="relative rounded-2xl border overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_380px] duration-300"
      style={{
        borderColor: hovered ? venture.accent + '55' : '#27272A',
        backgroundColor: '#18181B',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Animated top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] z-20"
        style={{ backgroundColor: venture.accent }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      />

      {/* Content panel */}
      <div className="p-8 lg:p-10 flex flex-col">
        {/* Editorial header row */}
        <div className="flex items-center gap-4 mb-7">
          <span
            className="font-heading font-black text-5xl leading-none select-none"
            style={{ color: venture.accent + '28' }}
          >
            {venture.number}
          </span>
          <span className="w-px h-8 bg-brand-border block" />
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live
          </span>
        </div>

        <h3 className="font-heading font-black text-2xl lg:text-[1.75rem] text-brand-fg leading-tight mb-2">
          {venture.name}
        </h3>
        <p className="text-sm font-semibold mb-4" style={{ color: venture.accent }}>
          {venture.tagline}
        </p>
        <p className="text-sm text-brand-fg-muted leading-relaxed mb-6">
          {venture.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2 mb-7">
          {venture.stack.map((s) => (
            <span
              key={s}
              className="text-xs px-2.5 py-1 rounded-full border border-brand-border text-brand-fg-muted font-medium"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Features 2-col grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
          {venture.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-brand-fg-muted">
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: venture.accent }}
              />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto">
          <motion.a
            href={venture.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold cursor-pointer"
            style={{ color: venture.accent }}
          >
            Visit {venture.abbr} <ArrowUpRight size={14} />
          </motion.a>
        </div>
      </div>

      {/* Visual panel — desktop only */}
      <div
        className="relative hidden lg:flex items-center justify-center overflow-hidden border-l border-brand-border/50 min-h-[320px]"
      >
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${venture.accent}14 0%, ${venture.accent}04 100%)` }}
        />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Big background letter */}
        <span
          className="absolute font-heading font-black pointer-events-none select-none"
          style={{ fontSize: 210, color: venture.accent + '10', lineHeight: 1, zIndex: 1 }}
        >
          {venture.name[0]}
        </span>
        {/* Mouse-tracked glow */}
        <motion.div
          className="absolute w-56 h-56 rounded-full blur-[90px] pointer-events-none"
          style={{ backgroundColor: venture.accent, opacity: 0.18, x: glowX, y: glowY, zIndex: 2 }}
        />
        {/* Centered abbr chip */}
        <div className="relative z-10 flex flex-col items-center gap-2.5">
          <div
            className="px-7 py-4 rounded-2xl font-heading font-black text-3xl tracking-tight"
            style={{
              border: `1px solid ${venture.accent}45`,
              color: venture.accent,
              background: `${venture.accent}14`,
              backdropFilter: 'blur(12px)',
            }}
          >
            {venture.abbr}
          </div>
          <span className="text-xs text-brand-fg-muted uppercase tracking-[0.18em]">
            {venture.tagline}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Ventures() {
  const [ref, inView] = useInView({ threshold: 0.15, once: true })

  return (
    <section id="ventures" className="relative overflow-hidden py-24 px-6">
      <AnimatedBg variant="ventures" />
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section header */}
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
          >
            My Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-heading font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Ventures & Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 text-brand-fg-muted max-w-xl"
          >
            Startups built on HighLevel — helping agencies and local businesses grow with smart automation.
          </motion.p>
        </div>

        {/* Venture cards */}
        <div className="flex flex-col gap-6 mb-8">
          {ventures.map((v, i) => (
            <VentureCard key={v.name} venture={v} index={i} />
          ))}
        </div>

        {/* Level Up Marketplace */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="relative rounded-2xl border border-brand-border bg-brand-surface overflow-hidden"
        >
          {/* Background glows */}
          <div className="absolute -right-16 -top-16 w-72 h-72 bg-brand-accent/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -left-10 -bottom-16 w-56 h-56 bg-violet-600/08 blur-[80px] rounded-full pointer-events-none" />
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          <div className="relative z-10 p-8 lg:p-10">
            <div className="flex flex-wrap items-start justify-between gap-6 mb-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-accent mb-2">
                  Where I Work
                </p>
                <h3 className="font-heading font-black text-2xl lg:text-3xl text-brand-fg mb-2">
                  Level Up Marketplace
                </h3>
                <p className="text-brand-fg-muted text-sm max-w-lg leading-relaxed">
                  Support Head — leading the agency support team, resolving complex HighLevel issues, and ensuring every client gets best-in-class service.
                </p>
              </div>
              <motion.a
                href="https://www.levelupmarketplace.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-semibold transition-colors shrink-0 shadow-lg shadow-brand-accent/20 cursor-pointer"
              >
                Visit LUM <ExternalLink size={13} />
              </motion.a>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-brand-border">
              {[
                { label: 'Role', value: 'Support Head' },
                { label: 'Platform', value: 'HighLevel' },
                { label: 'Focus', value: 'Agency Support' },
                { label: 'Team', value: 'Global' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.06 }}
                >
                  <p className="text-xs text-brand-fg-muted uppercase tracking-widest mb-0.5">{s.label}</p>
                  <p className="text-sm font-semibold text-brand-fg">{s.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
