import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Zap, Building2, Globe } from 'lucide-react'

const highlights = [
  { icon: Building2, label: 'Level Up Marketplace', desc: 'Support Head driving agency success through expert HighLevel support and onboarding.' },
  { icon: Globe, label: 'White Label Your CRM', desc: 'Founder building the premier VA & custom dev platform for GHL agencies worldwide.' },
  { icon: Zap, label: 'GHL Automation', desc: 'Architecting intelligent workflows and AI agents that eliminate manual bottlenecks.' },
]

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">About Me</p>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-brand-fg leading-tight mb-6">
                Bridging Technical Complexity &amp; Business Growth
              </h2>
              <p className="text-brand-fg-muted leading-relaxed mb-4">
                I&apos;m a CRM specialist and entrepreneur who has spent years mastering the HighLevel ecosystem — from deep workflow automation to building AI-powered support systems that scale agencies.
              </p>
              <p className="text-brand-fg-muted leading-relaxed mb-8">
                As Support Head at Level Up Marketplace, I lead a team that handles onboarding, technical support, and custom development for agencies across the globe. Alongside that, I&apos;ve founded two startups that directly serve the needs I saw in the market: White Label Your CRM and Get Online Orders.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-surface border border-brand-border"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-brand-fg-muted">Open to strategic collaborations</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ x: 6, borderColor: 'rgba(37,99,235,0.4)' }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-brand-surface border border-brand-border cursor-default transition-colors duration-200"
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                  <item.icon size={18} className="text-brand-accent" />
                </div>
                <div>
                  <div className="font-heading font-semibold text-brand-fg mb-1">{item.label}</div>
                  <div className="text-sm text-brand-fg-muted leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
