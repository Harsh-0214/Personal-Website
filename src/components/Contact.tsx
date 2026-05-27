import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '../data/resume'
import { SectionHead } from './About'

const links = [
  {
    cat: 'Email',
    val: personal.email,
    href: `mailto:${personal.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    cat: 'GitHub',
    val: 'github.com/harsh-0214',
    href: personal.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    cat: 'LinkedIn',
    val: 'linkedin.com/in/harsh-tamakuwala',
    href: personal.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    cat: 'Phone',
    val: personal.phone,
    href: `tel:${personal.phone.replace(/-/g, '')}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.65 2.82a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 5.18 5.18l.99-.88a2 2 0 0 1 2.11-.45c.92.3 1.86.52 2.82.65A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="bg-base">
      <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-14 py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHead num="05" title="Contact" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h3 className="font-display font-black leading-[0.92] tracking-[-0.04em] mb-6"
              style={{ fontSize: 'clamp(3rem,7vw,5.5rem)' }}>
              Let's
              <span className="block" style={{ WebkitTextStroke: '1.5px #2A2A2A', color: 'transparent' }}>
                Build
              </span>
              Together.
            </h3>
            <p className="font-mono text-[0.82rem] text-text-mid leading-relaxed max-w-sm">
              Open to new grad roles and internships in backend engineering, cloud infrastructure,
              and IoT systems — starting April 2026. If you're building something that operates
              at real scale, I want to hear about it.
            </p>
          </motion.div>

          <div className="flex flex-col">
            {links.map((l, i) => (
              <motion.a
                key={l.cat}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 px-5 py-5 border border-line-subtle border-t-0 first:border-t hover:border-accent hover:bg-accent/5 transition-colors group"
                data-cursor
              >
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center border border-line-vis text-text-mid group-hover:border-accent group-hover:text-accent transition-all">
                  {l.icon}
                </div>
                <div className="flex-1">
                  <span className="font-mono text-[0.57rem] uppercase tracking-[0.15em] text-text-lo block mb-0.5">{l.cat}</span>
                  <span className="font-display font-semibold text-[0.88rem] text-text-hi group-hover:text-accent transition-colors">{l.val}</span>
                </div>
                <span className="font-mono text-text-lo group-hover:text-accent group-hover:translate-x-1.5 transition-all">→</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
