import { motion } from 'framer-motion'

const row1 = [
  { text: 'HighLevel Expert',      sep: '★' },
  { text: 'Workflow Automation',   sep: '◆' },
  { text: 'AI Agents',             sep: '★' },
  { text: 'Whitelabel Support',    sep: '◆' },
  { text: 'CRM Architecture',      sep: '★' },
  { text: 'GHL Snapshots',         sep: '◆' },
  { text: 'Agency Scaling',        sep: '★' },
  { text: 'SaaS Founder',          sep: '◆' },
  { text: '5+ Years Deep',         sep: '★' },
]

const row2 = [
  { text: 'Custom Development',    sep: '◆' },
  { text: 'API Integrations',      sep: '★' },
  { text: 'React & Vite',          sep: '◆' },
  { text: 'Level Up Marketplace',  sep: '★' },
  { text: 'Framer Motion',         sep: '◆' },
  { text: '100+ Agencies Served',  sep: '★' },
  { text: 'Remote Ready',          sep: '◆' },
  { text: 'Open to Work',          sep: '★' },
  { text: 'Pakistan → Global',     sep: '◆' },
]

function Track({ items, reverse = false, speed = 30 }) {
  const tripled = [...items, ...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: reverse ? ['-33.333%', '0%'] : ['0%', '-33.333%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {tripled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-heading font-semibold text-[11px] uppercase tracking-[0.22em] whitespace-nowrap px-5 text-brand-fg-muted hover:text-brand-fg transition-colors duration-200">
              {item.text}
            </span>
            <span className="text-[8px] text-brand-accent/70 shrink-0 px-1">{item.sep}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-brand-border/60 py-0.5">
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--color-brand-bg, #09090b), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--color-brand-bg, #09090b), transparent)' }} />

      {/* Row 1 — forward */}
      <div className="py-3 border-b border-brand-border/40">
        <Track items={row1} reverse={false} speed={32} />
      </div>

      {/* Row 2 — reverse */}
      <div className="py-3">
        <Track items={row2} reverse={true} speed={28} />
      </div>
    </div>
  )
}
