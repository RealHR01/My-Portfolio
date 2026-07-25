import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, Bot, Shield, Code2, BarChart3, Layers, ShoppingBag, Globe, Megaphone, ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { useMobile } from '../hooks/useMobile'
import SplitReveal from './SplitReveal'

const cards = [
  { icon: Zap,         title: 'Workflow Automations',  description: 'Complex multi-step HighLevel workflows that eliminate manual work and scale agency operations effortlessly.',         accent: '#2563EB' },
  { icon: Bot,         title: 'AI Agents',              description: 'Custom AI-powered bots and automations using GPT integrations within GHL pipelines.',                             accent: '#7C3AED' },
  { icon: Code2,       title: 'Custom Development',     description: 'React frontends, custom forms, and bespoke integrations that extend HighLevel beyond its defaults.',              accent: '#DC2626' },
  { icon: BarChart3,   title: 'Analytics & Reporting',  description: 'Dashboard builds and reporting setups that give agencies real-time visibility into what matters.',                accent: '#D97706' },
  { icon: Layers,      title: 'System Architecture',    description: 'Scalable GHL sub-account structures, permission models, and agency-to-client delivery frameworks.',              accent: '#0891B2' },
  { icon: ShoppingBag, title: 'Shopify Development',    description: 'Custom Shopify store builds, theme customisation, app integrations, and conversion-focused checkout flows.',      accent: '#95BF47' },
  { icon: Shield,      title: 'Whitelabel Support',     description: 'Full-suite white-label support for agencies — onboarding, tech setup, and ongoing SaaS assistance.',            accent: '#059669' },
  { icon: Globe,       title: 'WordPress Development',  description: 'Full WordPress site builds, WooCommerce setups, plugin configuration, speed optimisation, and maintenance.',    accent: '#21759B' },
  { icon: Megaphone,   title: 'Digital Marketing',      description: 'Paid ads, email campaigns, funnel strategy, and social media management to generate leads and drive growth.',   accent: '#F59E0B' },
]

function Card({ card, index }) {
  const Icon = card.icon
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      whileHover={{ y: -6, borderColor: card.accent + '66' }}
      transition={{ duration: 0.25 }}
      className="relative flex-none w-[320px] h-[340px] rounded-2xl border border-brand-border bg-brand-surface overflow-hidden group"
      style={{ willChange: 'transform' }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 25% 25%, ${card.accent}20, transparent 65%)` }}
      />
      {/* Ghost number */}
      <div
        aria-hidden
        className="absolute -bottom-2 -right-1 font-black leading-none pointer-events-none select-none font-heading"
        style={{ fontSize: '8rem', color: card.accent + '0D' }}
      >
        {num}
      </div>
      {/* Animated top line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px]"
        style={{ backgroundColor: card.accent }}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.4 }}
      />

      <div className="relative z-10 p-7 flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold tracking-widest text-brand-fg-muted">{num}</span>
          <motion.div
            whileHover={{ scale: 1.12, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            className="w-11 h-11 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: card.accent + '20', color: card.accent }}
          >
            <Icon size={20} />
          </motion.div>
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-bold text-lg text-brand-fg leading-tight mb-2.5">
            {card.title}
          </h3>
          <p className="text-sm text-brand-fg-muted leading-relaxed">{card.description}</p>
        </div>
        <div
          className="self-start text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
          style={{ backgroundColor: card.accent + '18', color: card.accent }}
        >
          Expertise
        </div>
      </div>
    </motion.div>
  )
}

function CtaCard() {
  return (
    <motion.a
      href="#contact"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex-none w-[280px] h-[340px] rounded-2xl border border-brand-border bg-brand-surface overflow-hidden group cursor-pointer flex flex-col items-start justify-between p-7"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'radial-gradient(ellipse at 20% 30%, rgba(37,99,235,0.12), transparent 65%)' }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-violet-500 to-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="relative z-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-3">Let's Work</p>
        <h3 className="font-heading font-bold text-2xl text-brand-fg leading-tight">Got a<br />Project?</h3>
        <p className="text-sm text-brand-fg-muted mt-2 leading-relaxed">Let's build something exceptional together.</p>
      </div>
      <div className="relative z-10 w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
        <ArrowUpRight size={18} className="text-white" />
      </div>
    </motion.a>
  )
}

export default function Expertise() {
  const isMobile = useMobile()
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useGSAP(() => {
    if (isMobile || !trackRef.current || !sectionRef.current) return

    const track = trackRef.current
    const totalScroll = track.scrollWidth - window.innerWidth + 96 // 96px padding

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.2,
        end: () => '+=' + totalScroll,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { scaleX: self.progress })
          }
        },
      },
    })
  }, { dependencies: [isMobile], scope: sectionRef })

  if (isMobile) {
    return (
      <section id="expertise" className="relative overflow-hidden py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3">What I Do</p>
            <SplitReveal
              text="Areas of Expertise"
              className="font-heading font-bold leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <Card card={card} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div className="h-full flex flex-col justify-center">
        {/* Header */}
        <div className="px-16 mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3">What I Do</p>
            <SplitReveal
              text="Areas of Expertise"
              className="font-heading font-bold leading-tight text-brand-fg"
              style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)' }}
            />
          </div>
          <p className="text-brand-fg-muted text-sm max-w-xs text-right leading-relaxed">
            Scroll to explore →<br />
            Deep specialization across the full HighLevel ecosystem.
          </p>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex gap-5 pl-16"
          style={{ willChange: 'transform' }}
        >
          {cards.map((card, i) => (
            <Card key={card.title} card={card} index={i} />
          ))}
          <CtaCard />
        </div>

        {/* Progress bar */}
        <div className="px-16 mt-10">
          <div className="h-px bg-brand-border rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-brand-accent rounded-full origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
