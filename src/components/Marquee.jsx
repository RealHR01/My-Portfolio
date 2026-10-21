import { motion } from 'framer-motion'

const row1 = [
  'HighLevel Expert', 'Workflow Automation', 'AI Agents',
  'Whitelabel Support', 'CRM Architecture', 'GHL Snapshots',
  'Agency Scaling', '5+ Years Deep', 'Level Up Marketplace',
]

const row2 = [
  'All The Apps', 'Custom Development', 'API Integrations',
  'React & Vite', '100+ Agencies Served', 'Remote Ready',
  'Open to Work', 'Pakistan to Global', 'HighLevel Support',
]

function Track({ items, reverse = false, speed = 30 }) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((text, i) => (
          <div key={i} className="flex items-center shrink-0 group">
            <span className="font-heading font-semibold text-[11px] uppercase tracking-[0.25em] whitespace-nowrap px-5 text-brand-fg-muted group-hover:text-brand-fg transition-colors duration-300 cursor-default">
              {text}
            </span>
            <span
              className="shrink-0 w-1 h-1 rounded-full"
              style={{ backgroundColor: i % 3 === 0 ? '#2563EB' : i % 3 === 1 ? '#7C3AED' : '#DB2777', opacity: 0.7 }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-brand-border/50">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--color-brand-bg,#09090b) 20%, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--color-brand-bg,#09090b) 20%, transparent)' }} />

      <div className="py-3 border-b border-brand-border/30">
        <Track items={row1} reverse={false} speed={35} />
      </div>
      <div className="py-3">
        <Track items={row2} reverse={true} speed={30} />
      </div>
    </div>
  )
}
