import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Mail, MessageSquare, Send, CheckCircle, ExternalLink } from 'lucide-react'

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: 'support@levelupmarketplace.com',
    href: 'mailto:support@levelupmarketplace.com',
    desc: 'Reach out for project inquiries',
  },
  {
    icon: MessageSquare,
    label: 'White Label Your CRM',
    value: 'whitelabelyourcrm.com',
    href: 'https://whitelabelyourcrm.com/',
    desc: 'VA & custom dev for your agency',
  },
  {
    icon: ExternalLink,
    label: 'Get Online Orders',
    value: 'getonlineorders.com',
    href: 'https://getonlineorders.com/',
    desc: 'Restaurant ordering system',
  },
]

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1 })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 px-6 bg-brand-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">Get In Touch</p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-brand-fg leading-tight">
            Let&apos;s Build Something
          </h2>
          <p className="text-brand-fg-muted mt-4 max-w-xl mx-auto">
            Whether you need GHL automation, custom CRM development, or want to explore partnership opportunities — I&apos;m always open to a conversation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {channels.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 p-5 rounded-2xl bg-brand-surface border border-brand-border hover:border-brand-accent/40 transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                  <ch.icon size={18} className="text-brand-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-brand-fg-muted mb-0.5">{ch.label}</div>
                  <div className="text-sm font-medium text-brand-fg truncate">{ch.value}</div>
                  <div className="text-xs text-brand-fg-muted mt-0.5">{ch.desc}</div>
                </div>
                <ExternalLink size={14} className="text-brand-fg-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="p-8 rounded-3xl bg-brand-surface border border-brand-border"
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center gap-4 py-10 text-center"
              >
                <CheckCircle size={48} className="text-green-400" />
                <h3 className="font-heading font-bold text-xl text-brand-fg">Message Sent!</h3>
                <p className="text-sm text-brand-fg-muted">I&apos;ll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-brand-fg-muted mb-2">
                      Name <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-brand-bg border border-brand-border text-sm text-brand-fg placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-brand-fg-muted mb-2">
                      Email <span className="text-brand-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-brand-bg border border-brand-border text-sm text-brand-fg placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-brand-fg-muted mb-2">
                    Message <span className="text-brand-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project or how I can help..."
                    className="w-full px-4 py-3 rounded-xl bg-brand-bg border border-brand-border text-sm text-brand-fg placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accent-light text-white text-sm font-semibold transition-colors duration-200 shadow-lg shadow-brand-accent/20"
                >
                  <Send size={15} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
