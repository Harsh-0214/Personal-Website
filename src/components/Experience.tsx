import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { experience, certifications } from '../data/resume'
import { SectionHead } from './About'

function BulletText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1
          ? <strong key={i} className="font-semibold text-ink">{p}</strong>
          : <span key={i}>{p}</span>
      )}
    </>
  )
}

export default function Experience() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <section id="experience" className="bg-bg">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 pb-16 md:pb-28">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHead num="02" title="Experience" />
        </motion.div>

        {/* Timeline */}
        <div>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.1, duration: 0.75 }}
              className="border-b border-line"
            >
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full text-left flex items-start md:items-center justify-between gap-4 py-6 md:py-7 group"
                data-cursor
              >
                <div className="flex-1 md:grid md:grid-cols-[160px_1fr] lg:grid-cols-[190px_1fr] md:gap-8">
                  {/* Period + location */}
                  <div className="mb-1.5 md:mb-0">
                    <span className="font-sans text-[0.68rem] text-rust tracking-wide block mb-0.5">{exp.period}</span>
                    <span className="font-sans text-[0.65rem] text-dim">{exp.location}</span>
                  </div>
                  {/* Role + company */}
                  <div>
                    <h3 className="font-display text-[1.05rem] md:text-[1.15rem] text-ink leading-snug mb-1 group-hover:text-rust transition-colors duration-200">
                      {exp.role}
                    </h3>
                    <span className="font-sans text-[0.72rem] text-mid">{exp.company}</span>
                  </div>
                </div>

                {/* Toggle */}
                <motion.span
                  animate={{ rotate: expanded === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 flex items-center justify-center border border-line text-mid text-lg group-hover:border-rust group-hover:text-rust transition-colors"
                >
                  +
                </motion.span>
              </button>

              {/* Bullets */}
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.36, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-7 space-y-3 md:pl-[calc(160px+2rem)] lg:pl-[calc(190px+2rem)]">
                      {exp.bullets.map((b, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: j * 0.04 } }}
                          className="flex gap-3 font-sans text-[0.84rem] text-mid leading-relaxed"
                        >
                          <span className="text-rust flex-shrink-0 mt-0.5 select-none font-display italic">—</span>
                          <BulletText text={b} />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.75 }}
          className="mt-12 md:mt-16"
        >
          <p className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-dim mb-5">Certifications</p>
          {certifications.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-4 border border-line px-5 py-4 hover:border-rust/50 hover:bg-surface transition-all duration-250 group rounded-sm"
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-rust/10 border border-rust/20 font-sans text-[0.52rem] font-semibold text-rust tracking-wider rounded-sm">
                AWS
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-medium text-[0.88rem] text-ink group-hover:text-rust transition-colors truncate">{c.name}</p>
                <p className="font-sans text-[0.65rem] text-dim">{c.issuer}</p>
              </div>
              <span className="font-sans text-[0.65rem] text-dim flex-shrink-0">{c.year}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
