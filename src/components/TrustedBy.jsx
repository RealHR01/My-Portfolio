import { motion } from 'framer-motion'

const agencies = [
  { name: 'WebScale Digital',   initial: 'W', color: '#2563EB' },
  { name: 'Prime Step AI',      initial: 'P', color: '#7C3AED' },
  { name: 'LaunchPad Agency',   initial: 'L', color: '#059669' },
  { name: 'GrowthForge',        initial: 'G', color: '#D97706' },
  { name: 'Orbit Media Co.',    initial: 'O', color: '#0891B2' },
  { name: 'NovaSaaS',           initial: 'N', color: '#DC2626' },
  { name: 'Apex Automation',    initial: 'A', color: '#7C3AED' },
  { name: 'BlueRidge Digital',  initial: 'B', color: '#2563EB' },
  { name: 'Velocity Funnels',   initial: 'V', color: '#059669' },
  { name: 'CloudLead Agency',   initial: 'C', color: '#D97706' },
  { name: 'TrueScale Media',    initial: 'T', color: '#0891B2' },
  { name: 'Nexus Growth',       initial: 'N', color: '#EC4899' },
]

function LogoTile({ agency }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 px-5 py-3 rounded-xl border border-brand-border bg-brand-surface opacity-50 hover:opacity-100 shrink-0 cursor-default select-none"
      style={{ transition: 'opacity 0.2s ease' }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 text-white font-heading"
        style={{ backgroundColor: agency.color }}
      >
        {agency.initial}
      </div>
      <span className="text-sm font-semibold text-brand-fg whitespace-nowrap">{agency.name}</span>
    </motion.div>
  )
}

function LogoTrack({ reverse = false, duration = 38 }) {
  const tripled = [...agencies, ...agencies, ...agencies]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 items-center gap-4"
        animate={{ x: reverse ? ['0%', '33.334%'] : ['0%', '-33.334%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {tripled.map((agency, i) => (
          <LogoTile key={i} agency={agency} />
        ))}
      </motion.div>
    </div>
  )
}

export default function TrustedBy() {
  return (
    <section className="relative py-20 overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent mb-3"
        >
          Trusted By
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="font-heading font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          Agencies That Rely On My Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-brand-fg-muted text-sm max-w-md mx-auto"
        >
          Partnered with 100+ agencies across the GHL ecosystem — from solo operators to enterprise-level teams.
        </motion.p>
      </div>

      {/* Carousel rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative flex flex-col gap-4"
      >
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #09090B, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #09090B, transparent)' }} />

        <LogoTrack duration={38} />
        <LogoTrack reverse duration={44} />
      </motion.div>

      {/* Bottom divider */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          {[
            { value: '100+', label: 'Agencies Served' },
            { value: '5+',   label: 'Countries' },
            { value: '5yrs', label: 'In the GHL Ecosystem' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="font-heading font-black text-2xl text-brand-fg">{s.value}</span>
              <span className="text-xs text-brand-fg-muted uppercase tracking-widest">{s.label}</span>
              {i < 2 && <span className="hidden sm:block w-px h-6 bg-brand-border ml-3" />}
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
