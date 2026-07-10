import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

const links = [
  { label: 'About',     href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Ventures',  href: '#ventures' },
  { label: 'Contact',   href: '#contact' },
]

function MagneticLink({ href, children }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative text-sm font-medium text-brand-fg-muted hover:text-brand-fg transition-colors duration-200 cursor-pointer group"
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-accent group-hover:w-full transition-all duration-300" />
    </motion.a>
  )
}

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-accent/40 transition-colors duration-200"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun size={15} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Moon size={15} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function Navbar({ theme, toggleTheme }) {
  const [atTop, setAtTop] = useState(true)
  const [open, setOpen] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollY, 'change', (latest) => setAtTop(latest < 20))

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={atTop ? {} : {
        background: 'rgb(var(--color-bg) / 0.82)',
        backdropFilter: 'blur(28px) saturate(180%)',
        WebkitBackdropFilter: 'blur(28px) saturate(180%)',
        borderBottom: '1px solid rgb(var(--color-border) / 0.5)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}
    >
      {/* Shimmer sweep */}
      {!atTop && (
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none overflow-hidden"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', repeatDelay: 6 }}
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgb(var(--color-fg) / 0.03) 50%, transparent 100%)' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between relative z-10">

        {/* Logo */}
        <motion.a
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading font-bold text-lg text-brand-fg tracking-tight"
        >
          HR<span className="text-brand-accent">.</span>
        </motion.a>

        {/* Desktop links */}
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

        {/* Desktop right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-3"
        >
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-brand-accent hover:bg-brand-accent-light text-white transition-colors duration-200"
          >
            Let&apos;s Talk
          </motion.a>
        </motion.div>

        {/* Mobile — toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={() => setOpen(!open)}
            className="text-brand-fg p-1"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Scroll progress */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-accent via-violet-500 to-brand-accent"
      />

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden border-b border-brand-border/40"
        style={{
          background: 'rgb(var(--color-bg) / 0.95)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
        }}
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
