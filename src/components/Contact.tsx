import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { personal } from '../data/resume'
import { SectionHead } from './About'

const contactItems = [
  {
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    label: 'GitHub',
    value: 'github.com/harsh-0214',
    href: personal.github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/harshtamakuwala',
    href: personal.linkedin,
  },
  {
    label: 'Phone',
    value: personal.phone,
    href: `tel:${personal.phone.replace(/-/g, '')}`,
  },
]

/* Small decorative asterisk */
function Asterisk() {
  return (
    <svg className="inline-block w-6 h-6 text-rust ml-2 mb-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 4h2v6.27l5.43-3.13 1 1.73L14 12l5.43 3.13-1 1.73L13 13.73V20h-2v-6.27l-5.43 3.13-1-1.73L10 12 4.57 8.87l1-1.73L11 10.27z"/>
    </svg>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="bg-bg">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 py-16 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHead num="05" title="Contact" />
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 items-start">

          {/* Left: editorial headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <h3
              className="font-display italic text-ink leading-[0.9] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              Let's work
              <span className="block text-stroke-warm not-italic">together.</span>
            </h3>
            <p className="font-sans text-[0.9rem] text-mid leading-relaxed max-w-xs">
              Open to new-grad roles and internships in backend engineering, cloud infrastructure,
              and IoT systems — starting April 2026.
            </p>

            {/* Decorative squiggle */}
            <svg
              className="mt-8 text-rust"
              width="96" height="10" viewBox="0 0 96 10" fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 7 Q12 2 24 7 Q36 12 48 7 Q60 2 72 7 Q84 12 96 7"
                stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Right: contact links as flowing editorial list */}
          <div className="space-y-8">
            {contactItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.09 + 0.2, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
              >
                <span className="font-sans text-[0.6rem] uppercase tracking-[0.22em] text-dim block mb-1.5">
                  {item.label}
                </span>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="font-display text-[1.15rem] md:text-[1.3rem] text-ink hover:text-rust transition-colors duration-200 underline-grow"
                  data-cursor
                >
                  {item.value}
                </a>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom: availability callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 md:mt-20 flex items-start gap-4 border-t border-line pt-10"
        >
          <div className="w-2 h-2 rounded-full bg-rust mt-2 flex-shrink-0 animate-gentle-pulse" />
          <p className="font-sans text-[0.84rem] text-mid leading-relaxed">
            Currently available for full-time roles starting{' '}
            <strong className="font-semibold text-ink">April 2026</strong>.
            If you're building something that operates at real scale — infrastructure, IoT,
            backend services — I want to hear about it.<Asterisk />
          </p>
        </motion.div>

      </div>
    </section>
  )
}
