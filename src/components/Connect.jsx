import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'
import { useInView } from '../hooks/useInView'
import SplitReveal from './SplitReveal'

const channels = [
  { label: 'WhatsApp',  href: 'https://wa.me/923096410300',               accent: '#25D366', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { label: 'Facebook',  href: 'https://www.facebook.com/hashirlump',       accent: '#1877F2', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { label: 'Instagram', href: 'https://www.instagram.com/imhashiir',       accent: '#E1306C', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  { label: 'Telegram',  href: 'https://t.me/hashirraza',                   accent: '#26A5E4', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg> },
  { label: 'Discord',   href: 'https://discord.com/users/hashirraza',      accent: '#5865F2', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.014.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg> },
]

/* ─── Magnetic email link ────────────────────────────────────── */
function EmailCTA({ inView }) {
  const ref = useRef(null)
  const lineRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 100, damping: 16 })
  const sy = useSpring(my, { stiffness: 100, damping: 16 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left - r.width / 2) * 0.08)
    my.set((e.clientY - r.top - r.height / 2) * 0.08)
  }
  const onLeave = () => { mx.set(0); my.set(0); setHovered(false) }

  useGSAP(() => {
    if (!ref.current) return
    gsap.from(ref.current, {
      opacity: 0, y: 40, duration: 1, ease: 'power3.out', delay: 0.25,
      scrollTrigger: { trigger: ref.current, start: 'top 88%' },
    })
  }, { scope: ref })

  return (
    <motion.a
      ref={ref}
      href="mailto:hello@hashirraza.com"
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      className="group relative inline-block mt-8 mb-12"
    >
      {/* The text */}
      <span
        className="font-heading font-bold leading-none tracking-tight transition-colors duration-300"
        style={{
          fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
          color: hovered ? '#2563EB' : '#FAFAFA',
          display: 'block',
        }}
      >
        hello@hashirraza.com
      </span>

      {/* Animated underline — full width sweep */}
      <span
        className="absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-500 ease-out"
        style={{
          width: hovered ? '100%' : '0%',
          background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
        }}
      />

      {/* Arrow that appears on hover */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -12 }}
        transition={{ duration: 0.25 }}
        className="absolute -right-12 top-1/2 -translate-y-1/2 text-brand-accent font-bold"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.8rem)' }}
        aria-hidden
      >
        ↗
      </motion.span>
    </motion.a>
  )
}

export default function Connect() {
  const [ref, inView] = useInView({ threshold: 0.1, once: true })
  const sectionRef = useRef(null)

  return (
    <section id="connect" ref={sectionRef} className="relative overflow-hidden py-32 md:py-40 px-6">

      {/* Background: large ghost "@" */}
      <div
        aria-hidden
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none font-heading font-bold leading-none"
        style={{
          fontSize: 'clamp(18rem, 40vw, 36rem)',
          color: 'rgba(37,99,235,0.03)',
          WebkitTextStroke: '1px rgba(37,99,235,0.06)',
          right: '-5vw',
          userSelect: 'none',
        }}
      >
        @
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[50vw] h-[50vh] -translate-y-1/2 bg-brand-accent/5 blur-[140px] rounded-full" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-border to-transparent" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">

        {/* Editorial header row */}
        <div className="flex items-center gap-6 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-accent shrink-0">Let's Talk</span>
          <div className="flex-1 h-px bg-brand-border" />
          <span className="text-[10px] font-mono text-brand-fg-muted shrink-0 hidden sm:block">GMT+5 · Pakistan · Remote Ready</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            <span className="text-[10px] text-brand-fg-muted">Available</span>
          </div>
        </div>

        {/* Heading — "Start a" filled, "Conversation" outlined */}
        <div>
          <SplitReveal
            text="Start a"
            className="font-heading font-bold leading-none text-brand-fg"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          />
          <SplitReveal
            text="Conversation."
            className="font-heading font-bold leading-none"
            style={{
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              WebkitTextStroke: '1.5px rgba(250,250,250,0.6)',
              color: 'transparent',
            }}
            delay={0.18}
          />
        </div>

        {/* Email CTA */}
        <EmailCTA inView={inView} />

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          className="origin-left h-px bg-gradient-to-r from-brand-accent/60 via-brand-border to-transparent mb-8"
        />

        {/* Channel pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-2.5"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-fg-muted mr-2 hidden sm:block">Or find me on</span>
          {channels.map((ch, i) => (
            <motion.a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.55 + i * 0.06 }}
              whileHover={{ y: -3, borderColor: ch.accent + '80', backgroundColor: ch.accent + '10' }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-brand-border bg-brand-surface transition-all duration-200"
            >
              <span style={{ color: ch.accent }}>{ch.icon}</span>
              <span className="text-xs font-semibold text-brand-fg-muted group-hover:text-brand-fg transition-colors duration-200">
                {ch.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
