import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function SectionDivider({ label, index }) {
  const [ref, inView] = useInView({ threshold: 0.5, once: true })

  return (
    <div ref={ref} className="relative px-6 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Animated line — left */}
        <motion.div
          className="flex-1 h-px bg-gradient-to-r from-transparent to-brand-border"
          initial={{ scaleX: 0, originX: 1 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        />

        {/* Center label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-3 shrink-0"
        >
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-brand-fg-muted/50">
            {String(index).padStart(2, '0')}
          </span>
          <span className="w-1 h-1 rounded-full bg-brand-accent/50" />
          <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] text-brand-fg-muted/50">
            {label}
          </span>
        </motion.div>

        {/* Animated line — right */}
        <motion.div
          className="flex-1 h-px bg-gradient-to-l from-transparent to-brand-border"
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
        />
      </div>
    </div>
  )
}
