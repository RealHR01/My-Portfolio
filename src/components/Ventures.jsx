import { motion } from 'framer-motion'
import { ExternalLink, Zap, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const ventures = [
  {
    name: 'White Label Your CRM',
    abbr: 'WLCRM',
    href: 'https://whitelabelyourcrm.com/',
    accent: '#2563EB',
    accentBg: '#2563EB1A',
    tagline: 'Turnkey CRM solutions for agencies',
    description: 'A fully managed white-label CRM platform built on HighLevel, enabling agencies to offer professional CRM services without technical overhead.',
    features: [
      'Pre-built GHL snapshots & funnels',
      'Branded client onboarding flows',
      'Done-for-you automation setup',
      'Ongoing support & updates',
    ],
  },
  {
    name: 'Get Online Orders',
    abbr: 'GOO',
    href: 'https://getonlineorders.com/',
    accent: '#059669',
    accentBg: '#0596691A',
    tagline: 'Digital ordering for local businesses',
    description: 'An end-to-end online ordering system for local restaurants and retailers, powered by HighLevel automations and custom checkout flows.',
    features: [
      'Custom ordering pages & menus',
      'Automated order confirmations',
      'Payment gateway integrations',
      'Real-time order management',
    ],
  },
]

function VentureCard({ venture, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border overflow-hidden transition-all duration-300"
      style={{
        borderColor: hovered ? venture.accent + '60' : '#27272A',
        backgroundColor: hovered ? venture.accent + '08' : '#18181B',
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 rounded-full"
        style={{ backgroundColor: venture.accent }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      />

      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: venture.accentBg, color: venture.accent }}
            >
              {venture.abbr}
            </div>
            <h3 className="font-heading font-black text-2xl text-brand-fg leading-tight">{venture.name}</h3>
            <p className="text-sm mt-1" style={{ color: venture.accent }}>{venture.tagline}</p>
          </div>
          <motion.a
            href={venture.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, rotate: 8 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-10 h-10 rounded-xl border border-brand-border bg-brand-bg text-brand-fg-muted hover:text-brand-fg shrink-0 mt-1 transition-colors"
          >
            <ExternalLink size={15} />
          </motion.a>
        </div>

        <p className="text-sm text-brand-fg-muted leading-relaxed mb-6">{venture.description}</p>

        <ul className="space-y-2.5">
          {venture.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-brand-fg-muted">
              <CheckCircle2 size={14} style={{ color: venture.accent, flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>

        <motion.a
          href={venture.href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-2 mt-7 text-sm font-semibold transition-colors"
          style={{ color: venture.accent }}
        >
          Visit {venture.abbr} <Zap size={13} />
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function Ventures() {
  const [ref, inView] = useInView({ threshold: 0.15, once: true })

  return (
    <section id="ventures" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {ventures.map((v, i) => (
            <VentureCard key={v.name} venture={v} index={i} />
          ))}
        </div>

        {/* Level Up Marketplace banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="relative rounded-2xl border border-brand-border bg-brand-surface p-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-brand-accent/15 text-brand-accent mb-3">
                Primary Role
              </div>
              <h3 className="font-heading font-black text-2xl text-brand-fg mb-1">Level Up Marketplace</h3>
              <p className="text-brand-fg-muted text-sm max-w-lg">
                Support Head — leading the agency support team, resolving complex HighLevel issues, and ensuring every client gets best-in-class service.
              </p>
            </div>
            <motion.a
              href="https://www.levelupmarketplace.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-semibold transition-colors shadow-lg shadow-brand-accent/25"
            >
              Visit LUM <ExternalLink size={13} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
