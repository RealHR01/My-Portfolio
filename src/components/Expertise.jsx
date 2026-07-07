import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Bot, Shield, Code2, BarChart3, Layers, ShoppingBag, Globe, Megaphone } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const cards = [
  {
    icon: Zap,
    title: 'Workflow Automations',
    description: 'Complex multi-step HighLevel workflows that eliminate manual work and scale agency operations effortlessly.',
    accent: '#2563EB',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Custom AI-powered bots and automations using GPT integrations within GHL pipelines.',
    accent: '#7C3AED',
  },
  {
    icon: Shield,
    title: 'Whitelabel Support',
    description: 'Full-suite white-label support for agencies — onboarding, tech setup, and ongoing SaaS assistance.',
    accent: '#059669',
  },
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'React frontends, custom forms, and bespoke integrations that extend HighLevel beyond its defaults.',
    accent: '#DC2626',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Dashboard builds and reporting setups that give agencies real-time visibility into what matters.',
    accent: '#D97706',
  },
  {
    icon: Layers,
    title: 'System Architecture',
    description: 'Scalable GHL sub-account structures, permission models, and agency-to-client delivery frameworks.',
    accent: '#0891B2',
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Development',
    description: 'Custom Shopify store builds, theme customisation, app integrations, and conversion-focused checkout flows.',
    accent: '#95BF47',
  },
  {
    icon: Globe,
    title: 'WordPress Development',
    description: 'Full WordPress site builds, WooCommerce setups, plugin configuration, speed optimisation, and ongoing maintenance.',
    accent: '#21759B',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Paid ads, email campaigns, funnel strategy, and social media management designed to generate leads and drive growth.',
    accent: '#F59E0B',
  },
]

function TiltCard({ card, index }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const Icon = card.icon

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    setTilt({ x: ((y - cy) / cy) * 6, y: ((cx - x) / cx) * 6 })
    setGlow({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      style={{
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(6px)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
        transition: hovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
      }}
      className="relative rounded-2xl border border-brand-border bg-brand-surface overflow-hidden group cursor-default h-full"
    >
      {/* Radial glow following cursor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(260px circle at ${glow.x}% ${glow.y}%, ${card.accent}18, transparent 70%)`,
        }}
      />

      <div className="relative z-10 p-6 h-full flex flex-col gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${card.accent}20`, color: card.accent }}
        >
          <Icon size={20} />
        </motion.div>

        <div className="flex-1">
          <h3 className="font-heading font-bold text-brand-fg text-lg leading-tight mb-2">{card.title}</h3>
          <p className="text-sm text-brand-fg-muted leading-relaxed">{card.description}</p>
        </div>

        {/* Animated bottom accent line */}
        <div className="h-px w-0 group-hover:w-full transition-all duration-500 rounded-full"
          style={{ backgroundColor: card.accent }} />
      </div>
    </motion.div>
  )
}

export default function Expertise() {
  const [ref, inView] = useInView({ threshold: 0.15, once: true })

  return (
    <section id="expertise" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
          >
            What I Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="font-heading font-black leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            Areas of Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 text-brand-fg-muted max-w-xl"
          >
            Deep specialization across the full HighLevel ecosystem — from technical implementation to agency operations.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <div key={card.title} className="min-h-[200px]">
              <TiltCard card={card} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
