import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Quote } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import SplitReveal from './SplitReveal'

// Replace embedId with real YouTube video IDs when client videos are available
const videos = [
  {
    id: 'tariq',
    name: 'Tariq Osman',
    company: 'LeadFlow Agency',
    role: 'Founder',
    result: '38% reply rate',
    accent: '#2563EB',
    embedId: null,
    quote: "The AI doesn't just blast emails. It reads the lead context and writes something that sounds like it came from us. Our reply rate went from under 5% to 38% in three weeks.",
    thumb: null,
  },
  {
    id: 'marcus',
    name: 'Marcus Webb',
    company: 'WebScale Digital',
    role: 'Director',
    result: '2-day to 2-hour onboarding',
    accent: '#7C3AED',
    embedId: null,
    quote: 'We went from dreading onboarding to using it as a sales differentiator. We literally demo the automation on sales calls now. Closes deals faster.',
    thumb: null,
  },
  {
    id: 'derek',
    name: 'Derek Hutchinson',
    company: 'Elevate Agency',
    role: 'Operations Director',
    result: '10+ hrs saved monthly',
    accent: '#059669',
    embedId: null,
    quote: "I used to lose entire Fridays to reporting. Now I get a summary in my Slack at 8am and I'm done. The dashboard shows my clients live data, not last month's.",
    thumb: null,
  },
  {
    id: 'sophie',
    name: 'Sophie Laurent',
    company: 'Laurent Digital',
    role: 'CTO',
    result: 'Webhook fixed in 45min',
    accent: '#DC2626',
    embedId: null,
    quote: 'I had been stuck on this webhook integration for two weeks. Hashir resolved it in 45 minutes. Not just fixed — explained exactly why it broke so we\'d never hit it again.',
    thumb: null,
  },
]

function VideoCard({ video, onPlay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border overflow-hidden cursor-pointer group"
      style={{ borderColor: hovered ? video.accent + '50' : '#27272A', backgroundColor: '#18181B' }}
      onClick={() => video.embedId && onPlay(video)}
    >
      {/* Accent top line */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] z-10"
        style={{ backgroundColor: video.accent }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.4 }}
      />

      {/* Video thumbnail placeholder */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/9', backgroundColor: video.accent + '10' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${video.accent}25, transparent 65%)`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {video.embedId ? (
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm"
              style={{ backgroundColor: video.accent + 'CC' }}
            >
              <Play size={22} fill="white" className="text-white ml-1" />
            </div>
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span
              className="font-heading font-black"
              style={{ fontSize: '4rem', color: video.accent + '30', lineHeight: 1 }}
            >
              {video.name.split(' ').map(w => w[0]).join('')}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-fg-muted">
              Video Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <Quote size={16} className="mb-3 opacity-40" style={{ color: video.accent }} />
        <p className="text-sm text-brand-fg-muted leading-relaxed mb-4 line-clamp-3">
          "{video.quote}"
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-fg">{video.name}</p>
            <p className="text-xs text-brand-fg-muted">{video.role} · {video.company}</p>
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full"
            style={{ color: video.accent, backgroundColor: video.accent + '18' }}
          >
            {video.result}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

function VideoModal({ video, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-6"
      style={{ backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 22, stiffness: 200 }}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ aspectRatio: '16/9' }}
        onClick={e => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.embedId}?autoplay=1&rel=0`}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </motion.div>
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <X size={18} className="text-white" />
      </button>
    </motion.div>
  )
}

export default function VideoTestimonials() {
  const [playing, setPlaying] = useState(null)
  const [sectionRef, inView] = useInView({ threshold: 0.1, once: true })

  return (
    <section id="video-testimonials" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-accent/4 blur-[120px] rounded-full" />
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
            Client Voices
          </motion.p>
          <SplitReveal
            text="What Clients Say"
            className="font-heading font-bold leading-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-4 text-brand-fg-muted max-w-xl text-sm leading-relaxed"
          >
            Text quotes are fine. Faces on camera are better. Video testimonials coming as clients record.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} onPlay={setPlaying} />
          ))}
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {playing && playing.embedId && (
          <VideoModal video={playing} onClose={() => setPlaying(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
