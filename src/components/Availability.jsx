import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Clock, CheckCircle2, Moon } from 'lucide-react'
import AnimatedBg from './AnimatedBg'

const zones = [
  {
    label: 'United Kingdom',
    city: 'London',
    timezone: 'Europe/London',
    flag: '🇬🇧',
    accent: '#2563EB',
    workStart: 9,
    workEnd: 18,
  },
  {
    label: 'United States',
    city: 'New York',
    timezone: 'America/New_York',
    flag: '🇺🇸',
    accent: '#DC2626',
    workStart: 9,
    workEnd: 18,
  },
  {
    label: 'Australia',
    city: 'Sydney',
    timezone: 'Australia/Sydney',
    flag: '🇦🇺',
    accent: '#059669',
    workStart: 9,
    workEnd: 18,
  },
]

function getTimeInZone(timezone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date())
}

function getHourInZone(timezone) {
  return parseInt(
    new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      hour12: false,
    }).format(new Date()),
    10
  )
}

function getDateInZone(timezone) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date())
}

function ClockFace({ time }) {
  const [hh, mm, ss] = time.split(':').map(Number)
  const secDeg = ss * 6
  const minDeg = mm * 6 + ss * 0.1
  const hrDeg = (hh % 12) * 30 + mm * 0.5

  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden>
      {/* Face */}
      <circle cx="40" cy="40" r="38" fill="#18181B" stroke="#27272A" strokeWidth="2" />
      {/* Hour ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 40 + 30 * Math.sin(angle)
        const y1 = 40 - 30 * Math.cos(angle)
        const x2 = 40 + 34 * Math.sin(angle)
        const y2 = 40 - 34 * Math.cos(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3F3F46" strokeWidth="1.5" />
      })}
      {/* Hour hand */}
      <line
        x1="40" y1="40"
        x2={40 + 18 * Math.sin((hrDeg * Math.PI) / 180)}
        y2={40 - 18 * Math.cos((hrDeg * Math.PI) / 180)}
        stroke="#FAFAFA" strokeWidth="3" strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1="40" y1="40"
        x2={40 + 26 * Math.sin((minDeg * Math.PI) / 180)}
        y2={40 - 26 * Math.cos((minDeg * Math.PI) / 180)}
        stroke="#FAFAFA" strokeWidth="2" strokeLinecap="round"
      />
      {/* Second hand */}
      <line
        x1="40" y1="40"
        x2={40 + 28 * Math.sin((secDeg * Math.PI) / 180)}
        y2={40 - 28 * Math.cos((secDeg * Math.PI) / 180)}
        stroke="#2563EB" strokeWidth="1" strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx="40" cy="40" r="3" fill="#2563EB" />
    </svg>
  )
}

function TimezoneCard({ zone, index }) {
  const [time, setTime] = useState(getTimeInZone(zone.timezone))
  const [date, setDate] = useState(getDateInZone(zone.timezone))
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeInZone(zone.timezone))
      setDate(getDateInZone(zone.timezone))
    }, 1000)
    return () => clearInterval(id)
  }, [zone.timezone])

  const hour = getHourInZone(zone.timezone)
  const isAvailable = hour >= zone.workStart && hour < zone.workEnd

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border overflow-hidden transition-all duration-300 p-6"
      style={{
        borderColor: hovered ? zone.accent + '60' : '#27272A',
        backgroundColor: hovered ? zone.accent + '08' : '#18181B',
      }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 rounded-full"
        style={{ backgroundColor: zone.accent }}
        animate={{ width: hovered ? '100%' : '30%' }}
        transition={{ duration: 0.4 }}
      />

      <div className="flex items-start justify-between gap-4">
        {/* Left: info */}
        <div className="flex flex-col gap-3 flex-1">
          {/* Flag + country */}
          <div className="flex items-center gap-2.5">
            <span className="text-2xl leading-none">{zone.flag}</span>
            <div>
              <div className="font-heading font-black text-brand-fg text-base leading-tight">{zone.label}</div>
              <div className="text-xs text-brand-fg-muted">{zone.city}</div>
            </div>
          </div>

          {/* Digital time */}
          <div
            className="font-heading font-black tabular-nums tracking-tight"
            style={{ fontSize: '2.2rem', lineHeight: 1, color: zone.accent }}
          >
            {time.slice(0, 5)}
            <span className="text-base font-medium ml-1" style={{ color: zone.accent + 'AA' }}>
              :{time.slice(6)}
            </span>
          </div>

          {/* Date */}
          <div className="text-xs text-brand-fg-muted">{date}</div>

          {/* Availability badge */}
          <div className="flex items-center gap-1.5">
            {isAvailable ? (
              <>
                <CheckCircle2 size={13} className="text-green-400" />
                <span className="text-xs font-semibold text-green-400">Available</span>
              </>
            ) : (
              <>
                <Moon size={13} className="text-brand-fg-muted" />
                <span className="text-xs font-semibold text-brand-fg-muted">Off Hours</span>
              </>
            )}
          </div>
        </div>

        {/* Right: analog clock */}
        <div className="shrink-0">
          <ClockFace time={time} />
        </div>
      </div>
    </motion.div>
  )
}

export default function Availability() {
  const [ref, inView] = useInView({ threshold: 0.15, once: true })

  return (
    <section id="availability" className="relative overflow-hidden py-24 px-6">
      <AnimatedBg variant="availability" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent mb-3"
          >
            Open to Remote Work
          </motion.p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="font-heading font-black leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Availability
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-brand-fg-muted text-sm max-w-sm md:text-right"
            >
              Available across UK, US & Australian timezones — so whenever you reach out, I'm there.
            </motion.p>
          </div>
        </div>

        {/* Timezone cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {zones.map((zone, i) => (
            <TimezoneCard key={zone.timezone} zone={zone} index={i} />
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-2xl border border-brand-border bg-brand-surface overflow-hidden p-6 md:p-8"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-brand-accent/5 blur-[60px] rounded-full" />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1">
                {['🇬🇧', '🇺🇸', '🇦🇺'].map((flag, i) => (
                  <span key={i} className="text-xl w-8 h-8 flex items-center justify-center rounded-full bg-brand-bg border border-brand-border">
                    {flag}
                  </span>
                ))}
              </div>
              <div>
                <p className="font-heading font-bold text-brand-fg text-base">Available for remote collaboration</p>
                <p className="text-xs text-brand-fg-muted mt-0.5">Covering 3 timezones · Flexible scheduling · Fast response</p>
              </div>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-semibold transition-colors shadow-lg shadow-brand-accent/25"
            >
              <Clock size={14} /> Book a Call
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
