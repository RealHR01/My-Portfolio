import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Calendar } from 'lucide-react'
import AnimatedBg from './AnimatedBg'

export default function Booking() {
  const [ref, inView] = useInView({ threshold: 0.1, once: true })

  useEffect(() => {
    if (document.querySelector('script[src*="form_embed.js"]')) return
    const script = document.createElement('script')
    script.src = 'https://goto.my-business.link/js/form_embed.js'
    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <section id="booking" className="relative overflow-hidden py-24 px-6">
      <AnimatedBg variant="contact" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div ref={ref} className="mb-12 text-center">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
          >
            Schedule a Call
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-heading font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Book a Meeting
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-brand-fg-muted text-sm max-w-md mx-auto"
          >
            Pick a time that works for you — I'm available across UK, US & Australian timezones.
          </motion.p>
        </div>

        {/* Calendar embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl border border-brand-border bg-brand-surface overflow-hidden"
        >
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

          {/* Loading placeholder shown until iframe loads */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-brand-border">
            <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center">
              <Calendar size={15} className="text-brand-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-fg">Hashir Raza</p>
              <p className="text-xs text-brand-fg-muted">30 min · Video Call</p>
            </div>
          </div>

          <div className="p-2">
            <iframe
              src="https://goto.my-business.link/widget/booking/JhGsZibv3ufF1IYQGkmp"
              style={{
                width: '100%',
                border: 'none',
                overflow: 'hidden',
                minHeight: '680px',
                display: 'block',
                borderRadius: '12px',
              }}
              scrolling="no"
              id="WMTHEwi8aF0DrlXIVzMG_1783547101702"
              title="Book a meeting with Hashir Raza"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
