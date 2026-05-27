import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personal } from '../data/resume'

/* Shared section header — exported so other sections can reuse */
export function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-5 mb-16">
      <span className="font-mono text-[0.6rem] text-accent tracking-[0.15em] flex-shrink-0">{num}</span>
      <h2
        className="font-display font-bold tracking-tight leading-none flex-shrink-0"
        style={{ fontSize: 'clamp(2rem,4.5vw,3.2rem)' }}
      >
        {title}
      </h2>
      <div className="flex-1 h-px bg-line-subtle" />
    </div>
  )
}

const reveal = (i: number) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.85, ease: [0.16, 1, 0.3, 1] as number[] },
  },
})

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="bg-base">
      <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-14 py-28">

        <motion.div variants={reveal(0)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <SectionHead num="01" title="About" />
        </motion.div>

        <div className="grid md:grid-cols-[260px_1fr] gap-14 items-start">

          {/* Avatar placeholder */}
          <motion.div variants={reveal(1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            {/* Replace this entire div with <img src="photo.jpg" alt="Harsh Tamakuwala" className="w-full border border-line-vis" /> */}
            <div className="relative aspect-[1/1.1] bg-card border border-line-vis overflow-hidden">
              {/* Grid pattern */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg,transparent,transparent 44px,#1C1C1C 44px,#1C1C1C 45px),' +
                    'repeating-linear-gradient(90deg,transparent,transparent 44px,#1C1C1C 44px,#1C1C1C 45px)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-accent/6 to-transparent" />
              {/* Corner brackets */}
              <div className="absolute top-2.5 left-2.5  w-3.5 h-3.5 border-t border-l border-accent" />
              <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-accent" />
              {/* Silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-20 h-20 opacity-[0.06]" fill="none" stroke="currentColor" strokeWidth={0.6}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <span className="absolute bottom-3 left-3.5 font-mono text-[0.55rem] text-accent/45 tracking-wider z-10">
                // photo.jpg
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <div>
            <motion.div
              variants={reveal(2)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="font-mono text-[0.86rem] text-text-mid leading-[1.9] space-y-4 mb-10"
            >
              <p>
                I'm <strong className="text-text-hi font-bold">Harsh Tamakuwala</strong> — a Software
                Engineering student at{' '}
                <strong className="text-text-hi font-bold">Ontario Tech University</strong> specialising in
                IoT Systems, graduating April 2026. I care about software that operates at infrastructure
                scale, where reliability and automation aren't optional — they're the baseline.
              </p>
              <p>
                Most recently I interned at <strong className="text-text-hi font-bold">CBC News</strong> as
                a Network Engineering Intern, where I built Python automation that cut infrastructure
                deployment time by <strong className="text-accent font-bold">80%</strong>, tracked inventory
                across <strong className="text-accent font-bold">1000+ network devices</strong>, and surfaced{' '}
                <strong className="text-accent font-bold">$8M+ in cost savings</strong> on a $44M Arista
                infrastructure project.
              </p>
              <p>
                I'm most comfortable at the backend and cloud layer — designing data pipelines,
                containerised services, and the kind of internal tooling that makes engineering teams
                dramatically more productive. When I'm not shipping, I'm chasing problems I don't have
                the answer to yet.
              </p>
            </motion.div>

            {/* Meta grid */}
            <motion.div
              variants={reveal(3)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-line-subtle pt-8"
            >
              {[
                { label: 'Location',  value: personal.location },
                { label: 'Status',    value: personal.status },
                { label: 'Focus',     value: 'Backend / Cloud / IoT' },
                { label: 'Education', value: `${personal.education}, ${personal.school}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.15em] text-accent block mb-1">
                    {label}
                  </span>
                  <span className="font-mono text-[0.8rem] text-text-hi">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
