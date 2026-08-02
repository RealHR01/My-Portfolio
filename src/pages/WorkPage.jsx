import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, TrendingUp, Clock, BarChart3, ArrowUpRight, ChevronRight, ChevronLeft } from 'lucide-react'
import { useTransition } from '../context/TransitionContext'
import ScrollProgress from '../components/ScrollProgress'

const cases = [
  {
    id: 'leadflow',
    label: '01',
    client: 'LeadFlow Agency',
    category: 'AI Automation',
    accent: '#2563EB',
    heroMetric: '38%',
    heroLabel: 'Reply Rate',
    heroSub: 'Industry average: 5-8%',
    resultIcon: TrendingUp,
    problem: "Manual follow-ups on 2,000+ leads per month. Sales reps copying-and-pasting email templates. Every follow-up felt generic because it was generic. Reply rate stuck at under 5% and the team had given up trying to fix it.",
    approach: "The root problem wasn't effort — it was personalization at scale. I built a GPT-4 orchestration layer inside GHL that reads each lead's intake data, the workflow stage they're in, and their last interaction, then drafts a contextually relevant message. Triggers are time-based and behaviour-based. Unsubscribes self-route. The system runs 24/7 without anyone touching it.",
    outcome: "Reply rate went from 4.8% to 38% within the first full month. The team's workload dropped from 22 manual hours per week to zero. They scaled from 300 leads/month to 2,000+ without adding headcount.",
    metrics: [
      { label: 'Reply Rate', before: '4.8%', after: '38%', delta: '+692%' },
      { label: 'Manual Hours/Wk', before: '22h', after: '0h', delta: '100% saved' },
      { label: 'Leads/Month', before: '300', after: '2,000+', delta: '7x scale' },
      { label: 'Time to Results', before: 'N/A', after: '3 weeks', delta: 'Full sprint' },
    ],
    quote: "The AI doesn't just blast emails. It reads the lead context and writes something that sounds like it came from us. Our reply rate went from under 5% to 38% in three weeks.",
    author: 'Tariq O.', role: 'Founder, LeadFlow Agency',
    stack: ['GoHighLevel', 'GPT-4', 'Custom Webhooks', 'A2P Compliant SMS', 'Workflow Automation'],
  },
  {
    id: 'webscale',
    label: '02',
    client: 'WebScale Digital',
    category: 'Ops Automation',
    accent: '#7C3AED',
    heroMetric: '2 hrs',
    heroLabel: 'Onboarding Time',
    heroSub: 'Down from 2 full days',
    resultIcon: Clock,
    problem: "New client onboarding took 2 full days. A team member had to manually deploy snapshots, configure 47 settings across the sub-account, set up the welcome sequence, and schedule the kickoff call. It was a hiring problem disguised as a process problem.",
    approach: "I documented every manual step — all 47 of them — then built a trigger-based automation chain. When a new sub-account is created, a custom webhook fires a GHL workflow that deploys the snapshot, runs through all configurations in order, activates the welcome sequence, and creates a calendar appointment for the kickoff. The only human step is creating the sub-account.",
    outcome: "Onboarding went from 2 days to under 2 hours. The agency onboarded 8 new clients in the first week post-launch. They now use the automation as a sales differentiator — they demo it live on calls.",
    metrics: [
      { label: 'Onboarding Time', before: '2 days', after: '< 2 hrs', delta: '-96%' },
      { label: 'Manual Steps', before: '47', after: '1', delta: '-98%' },
      { label: 'Client Capacity/Mo', before: '6', after: '25+', delta: '4x growth' },
      { label: 'Team Hours Freed', before: 'N/A', after: '60+ hrs/mo', delta: 'Recurring' },
    ],
    quote: "We went from dreading onboarding to using it as a sales differentiator. We literally demo the automation on sales calls now. Closes deals faster.",
    author: 'Marcus W.', role: 'Director, WebScale Digital',
    stack: ['GoHighLevel', 'Custom Webhooks', 'Workflow Chains', 'Snapshot Deployment', 'Calendar Automation'],
  },
  {
    id: 'elevate',
    label: '03',
    client: 'Elevate Agency',
    category: 'Reporting Systems',
    accent: '#059669',
    heroMetric: '10+ hrs',
    heroLabel: 'Saved Monthly',
    heroSub: 'Recurring, every month',
    resultIcon: BarChart3,
    problem: "Monthly reporting consumed 12+ hours of the ops director's time. Data lived in three separate platforms: GHL, Facebook Ads, and Google Analytics. Compiling it meant exporting CSVs, reformatting in Sheets, and building a PDF from scratch. The report was always 3 days late and the moment it was sent, the data was already stale.",
    approach: "Built a live data pipeline using GHL custom webhooks and calculated fields that pulls from all three sources every 4 hours. The dashboard inside GHL gives a single-pane view of all KPIs in real time. A GSAP automation runs at 8am daily, compiles the briefing, and sends it to the director's Slack. End of month, one click generates the client-facing PDF.",
    outcome: "Reporting time dropped from 12+ hours to under 1 hour per month. Data is now live instead of monthly. The director gets a 30-second Slack briefing every morning. Clients receive reports faster and with higher data quality.",
    metrics: [
      { label: 'Reporting Time/Mo', before: '12h', after: '< 1h', delta: '-92%' },
      { label: 'Data Freshness', before: 'Monthly', after: 'Every 4hrs', delta: 'Live' },
      { label: 'Report Delivery', before: '3 days late', after: '1 click', delta: 'Instant' },
      { label: 'Data Sources', before: '3 silos', after: 'Unified', delta: '1 view' },
    ],
    quote: "I used to lose entire Fridays to reporting. Now I get a summary in my Slack at 8am and I'm done. The dashboard shows my clients live data, not last month's.",
    author: 'Derek H.', role: 'Operations Director, Elevate Agency',
    stack: ['GoHighLevel', 'Facebook Ads API', 'Google Analytics', 'Custom Webhooks', 'Slack Integration'],
  },
]

function MetricRow({ metric, accent }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-brand-border last:border-0">
      <span className="text-sm text-brand-fg-muted">{metric.label}</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-brand-fg-muted line-through opacity-50">{metric.before}</span>
        <span className="text-sm font-bold text-brand-fg">{metric.after}</span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ color: accent, backgroundColor: accent + '18' }}
        >
          {metric.delta}
        </span>
      </div>
    </div>
  )
}

export default function WorkPage() {
  const { go } = useTransition()
  const [active, setActive] = useState(0)
  const study = cases[active]
  const Icon = study.resultIcon

  const prev = () => setActive(i => (i - 1 + cases.length) % cases.length)
  const next = () => setActive(i => (i + 1) % cases.length)

  return (
    <div className="bg-brand-bg text-brand-fg min-h-screen">
      <ScrollProgress />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 lg:px-12 py-4 border-b border-brand-border/50 bg-brand-bg/90 backdrop-blur-lg">
        <button
          onClick={() => go('/')}
          className="flex items-center gap-1.5 text-sm font-semibold text-brand-fg-muted hover:text-brand-fg transition-colors group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform shrink-0" />
          <span className="hidden sm:inline">Back to Portfolio</span>
          <span className="sm:hidden">Back</span>
        </button>

        <div className="font-heading font-bold text-base text-brand-fg">
          HR<span className="text-brand-accent">.</span>
          <span className="text-brand-fg-muted text-xs font-normal ml-1.5">Work</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-accent/50 transition-all"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="text-xs text-brand-fg-muted font-mono">
            {String(active + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
          </span>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-brand-border flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-accent/50 transition-all"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </nav>

      <div className="pt-24 px-6 lg:px-12 pb-20 max-w-6xl mx-auto">

        {/* Sidebar nav */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

          <aside className="lg:w-56 shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-fg-muted mb-4">All Cases</p>
            <div className="flex flex-col gap-1">
              {cases.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 ${
                    active === i ? 'border-opacity-50 bg-brand-surface' : 'border-transparent hover:bg-brand-surface/50'
                  }`}
                  style={{ borderColor: active === i ? c.accent + '50' : undefined }}
                >
                  <span className="text-[10px] font-mono font-bold text-brand-fg-muted block mb-0.5">{c.label}</span>
                  <span className="text-sm font-semibold text-brand-fg block leading-tight">{c.client}</span>
                  <span className="text-xs font-bold" style={{ color: c.accent }}>{c.heroMetric} {c.heroLabel}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
              >

                {/* Hero metric */}
                <div
                  className="rounded-2xl border p-8 lg:p-10 mb-6 relative overflow-hidden"
                  style={{ borderColor: study.accent + '35', backgroundColor: '#18181B' }}
                >
                  <div className="h-[2px] absolute top-0 left-0 right-0" style={{ background: `linear-gradient(90deg, ${study.accent}, ${study.accent}40)` }} />
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-mono font-bold tracking-widest text-brand-fg-muted mb-2">{study.label} · {study.client} · {study.category}</p>
                      <div className="flex items-end gap-3 mb-1">
                        <span
                          className="font-heading font-black leading-none"
                          style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', color: study.accent }}
                        >
                          {study.heroMetric}
                        </span>
                        <div className="mb-2">
                          <p className="text-lg font-bold text-brand-fg">{study.heroLabel}</p>
                          <p className="text-sm text-brand-fg-muted">{study.heroSub}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: study.accent + '18', color: study.accent }}
                    >
                      <Icon size={28} />
                    </div>
                  </div>

                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-brand-border">
                    {study.stack.map(s => (
                      <span
                        key={s}
                        className="text-xs px-2.5 py-1 rounded-full border border-brand-border text-brand-fg-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics table */}
                <div className="rounded-2xl border border-brand-border bg-brand-surface p-6 mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-fg-muted mb-4">Before vs After</p>
                  {study.metrics.map(m => (
                    <MetricRow key={m.label} metric={m} accent={study.accent} />
                  ))}
                </div>

                {/* Narrative */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'The Problem', content: study.problem },
                    { label: 'The Approach', content: study.approach },
                    { label: 'The Outcome', content: study.outcome },
                  ].map(({ label, content }) => (
                    <div key={label} className="rounded-2xl border border-brand-border bg-brand-surface p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-fg-muted mb-3">{label}</p>
                      <p className="text-sm text-brand-fg-muted leading-relaxed">{content}</p>
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div
                  className="rounded-2xl border p-6 mb-6"
                  style={{ borderColor: study.accent + '30', backgroundColor: study.accent + '08' }}
                >
                  <p className="text-base lg:text-lg text-brand-fg leading-relaxed italic mb-4">"{study.quote}"</p>
                  <div>
                    <p className="text-sm font-bold text-brand-fg">{study.author}</p>
                    <p className="text-xs text-brand-fg-muted">{study.role}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="#contact"
                    onClick={() => go('/')}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent text-white text-sm font-semibold shadow-lg shadow-brand-accent/25 cursor-pointer"
                  >
                    Start a Similar Project <ArrowUpRight size={14} />
                  </motion.a>
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-border text-brand-fg-muted hover:text-brand-fg hover:border-brand-accent/40 text-sm font-semibold transition-all cursor-pointer"
                  >
                    Next Case Study <ChevronRight size={14} />
                  </button>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
