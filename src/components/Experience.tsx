import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { experience, certifications } from '../data/resume'
import { SectionHead } from './About'

/* Bold-wrap helper — turns **text** into <strong> */
function BulletText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1
          ? <strong key={i} className="text-text-hi font-bold">{p}</strong>
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
    <section id="experience" className="bg-base">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 pb-16 md:pb-28">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHead num="02" title="Experience" />
        </motion.div>

        {/* Timeline entries */}
        <div>
          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.14 + 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-line-subtle"
            >
              {/* Clickable header row */}
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full text-left flex items-start md:items-center justify-between gap-4 md:gap-6 py-6 md:py-7 group"
                data-cursor
              >
                <div className="flex-1 md:grid md:grid-cols-[160px_1fr] lg:grid-cols-[190px_1fr] md:gap-8 lg:gap-10">
                  {/* Meta */}
                  <div className="mb-1.5 md:mb-0">
                    <span className="font-mono text-[0.6rem] text-accent tracking-widest block mb-0.5">{exp.period}</span>
                    <span className="font-mono text-[0.6rem] text-text-lo block">{exp.location}</span>
                  </div>
                  {/* Role */}
                  <div>
                    <h3 className="font-display font-bold text-[1rem] md:text-[1.1rem] text-text-hi leading-snug mb-1 group-hover:text-accent transition-colors duration-200">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-[0.68rem] md:text-[0.7rem] text-accent/75">{exp.company}</span>
                  </div>
                </div>

                {/* Expand toggle */}
                <motion.div
                  animate={{ rotate: expanded === i ? 45 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="w-7 h-7 flex-shrink-0 border border-line-vis flex items-center justify-center font-mono text-text-lo group-hover:border-accent group-hover:text-accent transition-colors text-lg"
                >
                  +
                </motion.div>
              </button>

              {/* Expandable bullets */}
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    key="bullets"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="pb-6 md:pb-8 space-y-3 md:pl-[calc(160px+2rem)] lg:pl-[calc(190px+2.5rem)]">
                      {exp.bullets.map((b, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0, transition: { delay: j * 0.04 } }}
                          className="flex gap-3 font-mono text-[0.74rem] md:text-[0.77rem] text-text-mid leading-relaxed"
                        >
                          <span className="text-accent flex-shrink-0 mt-0.5 select-none">—</span>
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-14"
        >
          <p className="font-mono text-[0.57rem] tracking-[0.15em] uppercase text-accent mb-4 md:mb-5">Certifications</p>
          {certifications.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-3 md:gap-4 border border-line-subtle px-4 md:px-5 py-3 md:py-4 hover:border-accent/40 hover:bg-card transition-all duration-200 group"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-accent/10 border border-accent/25 font-mono text-[0.52rem] font-bold text-accent tracking-wider">
                AWS
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-[0.82rem] md:text-[0.88rem] text-text-hi group-hover:text-accent transition-colors truncate">{c.name}</p>
                <p className="font-mono text-[0.6rem] text-text-lo">{c.issuer}</p>
              </div>
              <span className="font-mono text-[0.6rem] text-text-lo flex-shrink-0">{c.year}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
