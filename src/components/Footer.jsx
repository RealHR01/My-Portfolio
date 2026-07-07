import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-xl text-brand-fg">
            HR<span className="text-brand-accent">.</span>
          </span>
          <span className="text-sm text-brand-fg-muted">GHL Expert & Founder</span>
        </div>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          {[
            { label: 'White Label Your CRM', href: 'https://whitelabelyourcrm.com/' },
            { label: 'Get Online Orders', href: 'https://getonlineorders.com/' },
          ].map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              className="flex items-center gap-1 text-sm text-brand-fg-muted hover:text-brand-fg transition-colors"
            >
              {link.label}
              <ExternalLink size={11} className="opacity-60" />
            </motion.a>
          ))}
        </div>

        <p className="text-xs text-brand-fg-muted text-center md:text-right">
          &copy; {year} Hashir Raza. Built with React &amp; Framer Motion.
        </p>
      </div>
    </footer>
  )
}
