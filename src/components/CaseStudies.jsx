import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Clock, Zap, BarChart3, ChevronRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import SplitReveal from './SplitReveal'
import { useInView } from '../hooks/useInView'
import { useTransition } from '../context/TransitionContext'

const cases = [
  {
    id: 'leadflow',
    label: '01',
    client: 'LeadFlow Agency',
    problem: 'Manual follow-ups on 2,000+ leads/month. Sales reps copying-and-pasting email templates. Reply rate stuck at under 5%.',
    solution: 'Built a multi-stage AI follow-up engine inside GHL. GPT-4 drafts personalised messages per lead context. Triggers fire at optimal send windows. Unsubscribes handled automatically. Zero manual touch after initial setup.',
    result: '38% reply rate',
    resultSub: 'up from 4.8%',
    resultIcon: TrendingUp,
    accent: '#2563EB',
    metrics: [
      { label: 'Reply Rate', before: '4.8%', after: '38%', delta: '+692%' },
      { label: 'Manual Hours/Week', before: '22h', after: '0h', delta: '100% saved' },
      { label: 'Leads Touched', before: '300/mo', after: '2,000+/mo', delta: '7x scale' },
    ],
    timeline: [
      { step: 'Audit', detail: 'Mapped entire existing follow-up process' },
      { step: 'Build', detail: 'AI prompt architecture + GHL workflow logic' },
      { step: 'Test', detail: 'A/B split against manual control group' },
      { step: 'Deploy', detail: 'Full rollout within 3 weeks of start' },
    ],
    quote: "The AI doesn't just blast emails. It reads the lead context and writes something that sounds like it came from us.",
    author: 'Tariq O., LeadFlow Agency',
  },
  {
    id: 'webscale',
    label: '02',
    client: 'WebScale Digital',
    problem: "Onboarding new GHL sub-accounts took their team 2 days per client. Manual snapshot deployment, permission setup, welcome sequences — all done by hand. Agency couldn't scale without hiring.",
    solution: 'Engineered a zero-touch onboarding pipeline. New sub-account creation triggers a GSAP snapshot deployment, auto-configures 47 settings, fires a branded welcome sequence, and books the kickoff call. All inside GHL.',
    result: '2 hours',
    resultSub: 'down from 2 days',
    resultIcon: Clock,
    accent: '#7C3AED',
    metrics: [
      { label: 'Onboarding Time', before: '2 days', after: '2 hrs', delta: '-96%' },
      { label: 'Manual Steps', before: '47', after: '1', delta: '-98%' },
      { label: 'Capacity/Month', before: '6 clients', after: '25+ clients', delta: '4x growth' },
    ],
    timeline: [
      { step: 'Discovery', detail: 'Documented every manual step in their process' },
      { step: 'Architect', detail: 'Designed trigger-based automation chain' },
      { step: 'Build', detail: '3-week sprint inside their GHL instance' },
      { step: 'Result', detail: 'Agency onboarded 8 clients in first week post-launch' },
    ],
    quote: 'We went from dreading onboarding to using it as a sales differentiator. We literally demo the automation on sales calls now.',
    author: 'Marcus W., WebScale Digital',
  },
  {
    id: 'elevate',
    label: '03',
    client: 'Elevate Agency',
    problem: 'Monthly reporting took the ops team 12+ hours to compile. Data lived in GHL, Facebook Ads, and Google Analytics. Director needed a live view — not a spreadsheet delivered on the 1st.',
    solution: 'Built a live reporting dashboard inside GHL using custom webhooks and calculated fields. Data pulls from all three sources every 4 hours. One-click PDF export for client-facing reports. Director gets a 30-second daily briefing automation.',
    result: '10+ hrs saved',
    resultSub: 'per month, ongoing',
    resultIcon: BarChart3,
    accent: '#059669',
    metrics: [
      { label: 'Reporting Time/Month', before: '12h', after: '< 1h', delta: '-92%' },
      { label: 'Data Freshness', before: 'Monthly', after: 'Every 4hrs', delta: 'Live' },
      { label: 'Client Report Speed', before: '3 days', after: '1 click', delta: 'Instant' },
    ],
    timeline: [
      { step: 'Audit', detail: 'Mapped all 3 data sources and export formats' },
      { step: 'Webhook', detail: 'Built data pipeline into GHL custom fields' },
      { step: 'Dashboard', detail: 'Live view + calculated KPI fields' },
      { step: 'Automate', detail: 'Daily briefing + monthly PDF automation' },
    ],
    quote: "I used to lose entire Fridays to reporting. Now I get a summary in my Slack at 8am and I'm done.",
    author: 'Derek H., Elevate Agency',
  },
]

function MetricCard({ metric, accent }) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-surface/60 p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-fg-muted mb-2">{metric.label}</p>
      <div className="flex items-end gap-3">
        <div>
          <p className="text-xs text-brand-fg-muted line-through">{metric.before}</p>
          <p className="text-xl font-heading font-bold text-brand-fg">{metric.after}</p>
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full mb-0.5"
          style={{ color: accent, backgroundColor: accent + '18' }}
        >
          {metric.delta}
        </span>
      </div>
    </div>
  )
}

function CaseCard({ study, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 ${
        isActive ? 'border-opacity-50 bg-brand-surface' : 'border-transparent hover:border-brand-border'
      }`}
      style={{ borderColor: isActive ? study.accent + '50' : undefined }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-mono font-bold tracking-widest text-brand-fg-muted mb-0.5">{study.label}</p>
          <p className="font-heading font-bold text-brand-fg text-sm">{study.client}</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: study.accent }}>{study.result}</p>
        </div>
        <ChevronRight
          size={14}
          className="transition-transform duration-200 shrink-0"
          style={{ color: study.accent, transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
      </div>
    </motion.button>
  )
}

export default function CaseStudies() {
  const [active, setActive] = useState(0)
  const [sectionRef, inView] = useInView({ threshold: 0.1, once: true })
  const { go } = useTransition()
  const study = cases[active]
  const Icon = study.resultIcon

  return (
    <section id="case-studies" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-accent/6 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-violet-500/5 blur-[100px] rounded-full" />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
          >
            Proof, Not Claims
          </motion.p>
          <SplitReveal
            text="Case Studies"
            className="font-heading font-bold leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 text-brand-fg-muted max-w-xl text-sm leading-relaxed"
          >
            Real clients. Real numbers. Before and after documented — not estimated.
          </motion.p>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

          {/* Left: case selector */}
          <div className="flex flex-col gap-2">
            {cases.map((c, i) => (
              <CaseCard
                key={c.id}
                study={c}
                isActive={active === i}
                onClick={() => setActive(i)}
              />
            ))}

            {/* Quick stat */}
            <div className="mt-4 rounded-xl border border-brand-border bg-brand-surface p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-fg-muted mb-2">Average Outcome</p>
              <p className="font-heading font-bold text-2xl text-brand-fg">82%</p>
              <p className="text-xs text-brand-fg-muted">reduction in manual work across all engagements</p>
            </div>
          </div>

          {/* Right: active case detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: [0.215, 0.61, 0.355, 1] }}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: study.accent + '35', backgroundColor: '#18181B' }}
            >
              {/* Accent line */}
              <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${study.accent}, ${study.accent}40)` }} />

              <div className="p-7 lg:p-9">

                {/* Hero metric */}
                <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                  <div>
                    <p className="text-[10px] font-mono font-bold tracking-widest text-brand-fg-muted mb-1">{study.label} · {study.client}</p>
                    <div className="flex items-end gap-3">
                      <span
                        className="font-heading font-black leading-none"
                        style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', color: study.accent }}
                      >
                        {study.result}
                      </span>
                      <span className="text-sm text-brand-fg-muted mb-2">{study.resultSub}</span>
                    </div>
                  </div>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: study.accent + '18', color: study.accent }}
                  >
                    <Icon size={24} />
                  </div>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                  {study.metrics.map((m) => (
                    <MetricCard key={m.label} metric={m} accent={study.accent} />
                  ))}
                </div>

                {/* Problem / Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-fg-muted mb-2">The Problem</p>
                    <p className="text-sm text-brand-fg-muted leading-relaxed">{study.problem}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-fg-muted mb-2">The Solution</p>
                    <p className="text-sm text-brand-fg-muted leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-fg-muted mb-3">How We Got There</p>
                  <div className="flex flex-wrap gap-2">
                    {study.timeline.map((t, i) => (
                      <div key={t.step} className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-surface border border-brand-border">
                          <span
                            className="text-[10px] font-black uppercase tracking-wider"
                            style={{ color: study.accent }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-semibold text-brand-fg">{t.step}</span>
                        </div>
                        {i < study.timeline.length - 1 && (
                          <div className="w-4 h-px" style={{ backgroundColor: study.accent + '40' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div
                  className="rounded-xl p-5 border"
                  style={{ borderColor: study.accent + '30', backgroundColor: study.accent + '08' }}
                >
                  <p className="text-sm text-brand-fg leading-relaxed italic mb-3">"{study.quote}"</p>
                  <p className="text-[11px] font-bold text-brand-fg-muted uppercase tracking-[0.15em]">{study.author}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-brand-border bg-brand-surface"
        >
          <div>
            <p className="font-heading font-bold text-brand-fg text-lg">Want results like these?</p>
            <p className="text-sm text-brand-fg-muted">Every engagement starts with a 30-minute call. No sales pitch. Just a look at your setup.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <motion.button
              onClick={() => go('/work')}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-border text-brand-fg-muted hover:text-brand-fg text-sm font-semibold cursor-pointer transition-colors"
            >
              View All Cases <ChevronRight size={14} />
            </motion.button>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-semibold shadow-xl shadow-brand-accent/25 cursor-pointer"
            >
              Book a Call <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
