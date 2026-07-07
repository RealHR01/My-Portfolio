import { motion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Availability', href: '#availability' },
  { label: 'Contact', href: '#contact' },
]

const ventures = [
  { label: 'White Label Your CRM', href: 'https://whitelabelyourcrm.com/' },
  { label: 'Get Online Orders', href: 'https://getonlineorders.com/' },
  { label: 'Level Up Marketplace', href: 'https://www.levelupmarketplace.com/' },
]

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/hashirlump',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/imhashiir',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/923096410300',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-brand-border overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-accent/5 blur-[100px] rounded-full" />
      </div>

      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div>
              <div className="font-heading font-black text-3xl text-brand-fg tracking-tight mb-1">
                HR<span className="text-brand-accent">.</span>
              </div>
              <p className="text-sm text-brand-fg-muted leading-relaxed max-w-xs">
                Support Head at Level Up Marketplace. GHL Expert, Startup Founder &amp; CRM Architect.
              </p>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl border border-brand-border bg-brand-surface flex items-center justify-center text-brand-fg-muted hover:text-brand-fg hover:border-brand-accent/50 transition-colors duration-200"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-fg-muted">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 4 }}
                    className="text-sm text-brand-fg-muted hover:text-brand-fg transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-border group-hover:bg-brand-accent transition-colors duration-200 shrink-0" />
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ventures */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-fg-muted">Ventures</h4>
            <ul className="flex flex-col gap-2.5">
              {ventures.map((v) => (
                <li key={v.href}>
                  <motion.a
                    href={v.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="text-sm text-brand-fg-muted hover:text-brand-fg transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-border group-hover:bg-brand-accent transition-colors duration-200 shrink-0" />
                    {v.label}
                    <ExternalLink size={10} className="opacity-0 group-hover:opacity-60 transition-opacity ml-auto" />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA card */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-fg-muted">Work Together</h4>
            <div className="relative rounded-2xl border border-brand-border bg-brand-surface p-5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
              <p className="text-sm text-brand-fg-muted leading-relaxed mb-4">
                Have a project in mind? Let's build something great together.
              </p>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-accent hover:bg-brand-accent-light text-white text-xs font-semibold transition-colors shadow-md shadow-brand-accent/20"
              >
                Get in Touch <ArrowUpRight size={12} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-border mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-fg-muted">
            All rights reserved &copy; {year} Hashir Raza
          </p>
          <div className="flex items-center gap-1.5 text-xs text-brand-fg-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available for new projects
          </div>
        </div>

      </div>
    </footer>
  )
}
