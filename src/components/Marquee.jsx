import { motion } from 'framer-motion'

const items = [
  'HighLevel Expert',
  'Workflow Automation',
  'AI Agents',
  'Whitelabel Support',
  'CRM Architecture',
  'GHL Snapshots',
  'Custom Development',
  'API Integrations',
  'SaaS Founder',
  'Agency Scaling',
  'React & Vite',
  'Framer Motion',
  'Level Up Marketplace',
]

function MarqueeTrack({ reverse = false }) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-0"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-fg-muted whitespace-nowrap px-6">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-accent shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative py-4 border-y border-brand-border overflow-hidden">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-brand-bg to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-brand-bg to-transparent pointer-events-none" />
      <MarqueeTrack />
    </div>
  )
}
