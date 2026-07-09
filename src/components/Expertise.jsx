import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Bot, Shield, Code2, BarChart3, Layers, ShoppingBag, Globe, Megaphone, ArrowUpRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import AnimatedBg from './AnimatedBg'

const cards = [
  {
    icon: Zap,
    title: 'Workflow Automations',
    description: 'Complex multi-step HighLevel workflows that eliminate manual work and scale agency operations effortlessly.',
    accent: '#2563EB',
    large: true,
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Custom AI-powered bots and automations using GPT integrations within GHL pipelines.',
    accent: '#7C3AED',
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
    icon: Shield,
    title: 'Whitelabel Support',
    description: 'Full-suite white-label support for agencies — onboarding, tech setup, and ongoing SaaS assistance.',
    accent: '#059669',
    large: true,
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
    description: 'Paid ads, email campaigns, funnel strategy, and social media management to generate leads and drive growth.',
    accent: '#F59E0B',
  },
]

function BentoCard({ card, index }) {
  const [hovered, setHovered] = useState(false)
  const Icon = card.icon
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border bg-brand-surface overflow-hidden group cursor-default h-full transition-colors duration-300"
      style={{ borderColor: hovered ? card.accent + '55' : '#27272A' }}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] rounded-full"
        style={{ backgroundColor: card.accent }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 25% 30%, ${card.accent}1A, transparent 65%)` }}
      />

      {/* Large ghost number */}
      <div
        aria-hidden
        className="absolute -bottom-3 -right-1 font-black leading-none pointer-events-none select-none font-heading"
        style={{ fontSize: card.large ? '9rem' : '7rem', color: card.accent + '0D' }}
      >
        {num}
      </div>

      <div className={`relative z-10 flex flex-col h-full ${card.large ? 'p-8 gap-6' : 'p-6 gap-4'}`}>
        {/* Number + Icon */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold tracking-widest text-brand-fg-muted">{num}</span>
          <motion.div
            whileHover={{ scale: 1.15, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className={`rounded-xl flex items-center justify-center shrink-0 ${card.large ? 'w-14 h-14' : 'w-10 h-10'}`}
            style={{ backgroundColor: card.accent + '20', color: card.accent }}
          >
            <Icon size={card.large ? 28 : 20} />
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3
            className={`font-heading font-black text-brand-fg leading-tight mb-2 ${card.large ? 'text-2xl' : 'text-lg'}`}
          >
            {card.title}
          </h3>
          <p className="text-sm text-brand-fg-muted leading-relaxed">{card.description}</p>
        </div>

        {/* Bottom tag for large cards */}
        {card.large && (
          <div
            className="self-start text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full"
            style={{ backgroundColor: card.accent + '18', color: card.accent }}
          >
            Featured
          </div>
        )}
      </div>
    </motion.div>
  )
}

function CTACard({ index }) {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.24, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl border border-brand-border bg-brand-surface overflow-hidden group cursor-pointer h-full min-h-[160px] flex flex-col items-start justify-between p-6"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(37,99,235,0.12), transparent 65%)' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-violet-500 to-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-2">Let's Work</p>
        <h3 className="font-heading font-black text-xl text-brand-fg leading-tight">Got a Project?</h3>
        <p className="text-sm text-brand-fg-muted mt-1">Let's build something great together.</p>
      </div>

      <div className="relative z-10 w-9 h-9 rounded-full bg-brand-accent flex items-center justify-center mt-4 group-hover:scale-110 transition-transform duration-200">
        <ArrowUpRight size={16} className="text-white" />
      </div>
    </motion.a>
  )
}

export default function Expertise() {
  const [ref, inView] = useInView({ threshold: 0.15, once: true })

  return (
    <section id="expertise" className="relative overflow-hidden py-24 px-6">
      <AnimatedBg variant="expertise" />
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
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

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
          {cards.map((card, i) => (
            <div key={card.title} className={card.large ? 'sm:col-span-2 lg:col-span-2' : ''}>
              <BentoCard card={card} index={i} />
            </div>
          ))}
          {/* CTA tile fills the last empty cell */}
          <CTACard />
        </div>

      </div>
    </section>
  )
}
