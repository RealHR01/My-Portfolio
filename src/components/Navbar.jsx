import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Contact', href: '#contact' },
]

function MagneticLink({ href, children }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({ x: (e.clientX - cx) * 0.3, y: (e.clientY - cy) * 0.3 })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative text-sm font-medium text-brand-fg-muted hover:text-brand-fg transition-colors duration-200 cursor-pointer group"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-accent group-hover:w-full transition-all duration-300" />
    </motion.a>
  )
}

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious()
    setHidden(latest > prev && latest > 100)
    setAtTop(latest < 20)
  })

  return (
    <motion.nav
      variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        atTop ? 'bg-transparent' : 'bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading font-bold text-lg text-brand-fg tracking-tight"
        >
          HR<span className="text-brand-accent">.</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {links.map((l) => (
            <MagneticLink key={l.href} href={l.href}>{l.label}</MagneticLink>
          ))}
        </motion.div>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-brand-accent hover:bg-brand-accent-light text-white transition-colors duration-200"
        >
          Let&apos;s Talk
        </motion.a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-brand-fg p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-brand-surface border-b border-brand-border"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-brand-fg-muted hover:text-brand-fg transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center px-4 py-2 rounded-full text-sm font-medium bg-brand-accent text-white"
          >
            Let&apos;s Talk
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
