import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personal } from '../data/resume'
import photo from '../assets/image-1780262826955.jpg'

/* Shared editorial section header used by all sections */
export function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-px bg-line flex-shrink-0" />
        <span className="font-sans text-[0.62rem] text-dim uppercase tracking-[0.22em]">{num}</span>
      </div>
      <h2
        className="font-display text-ink leading-[0.9]"
        style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}
      >
        {title}
      </h2>
    </div>
  )
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.25, 1, 0.5, 1] },
  },
})

export default function About() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="bg-bg">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 py-16 md:py-28">

        <motion.div
          variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <SectionHead num="01" title="About" />
        </motion.div>

        <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start">

          {/* Left: Avatar + quick facts */}
          <motion.div {...reveal(0.1)} animate={inView ? reveal(0.1).animate : reveal(0.1).initial}>
            {/* Photo */}
            <div className="relative aspect-[3/4] bg-surface border border-line overflow-hidden mb-6 max-w-[220px] md:max-w-none">
              <img
                src={photo}
                alt={personal.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-rust/50" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-rust/50" />
            </div>

            {/* Quick facts */}
            <div className="space-y-3">
              {[
                { label: 'Based in',   value: personal.location },
                { label: 'Status',     value: personal.status },
                { label: 'Graduating', value: personal.graduation },
              ].map(({ label, value }) => (
                <div key={label} className="border-t border-line-faint pt-3">
                  <span className="font-sans text-[0.58rem] uppercase tracking-[0.2em] text-dim block mb-0.5">{label}</span>
                  <span className="font-sans text-[0.82rem] text-ink">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio */}
          <div>
            {/* Pull-quote */}
            <motion.p
              {...reveal(0.2)}
              animate={inView ? reveal(0.2).animate : reveal(0.2).initial}
              className="font-display italic text-ink leading-[1.3] mb-8"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
            >
              "I build systems that hold up under real-world load — from IoT telemetry pipelines on GCP
              to enterprise network automation at CBC News."
            </motion.p>

            {/* Body paragraphs */}
            <motion.div
              {...reveal(0.32)}
              animate={inView ? reveal(0.32).animate : reveal(0.32).initial}
              className="font-sans text-[0.9rem] text-mid leading-[1.85] space-y-4 mb-10"
            >
              <p>
                I'm <strong className="font-semibold text-ink">Harsh Tamakuwala</strong> — a Software
                Engineering student at <strong className="font-semibold text-ink">Ontario Tech University</strong>,
                specialising in IoT Systems, graduating April 2026. I care deeply about software that
                operates at infrastructure scale, where reliability and automation aren't optional —
                they're the baseline.
              </p>
              <p>
                Most recently I interned at <strong className="font-semibold text-ink">CBC News</strong> as
                a Network Engineering Intern. I built Python automation that cut deployment time by{' '}
                <strong className="font-semibold text-rust">80%</strong>, tracked inventory across{' '}
                <strong className="font-semibold text-rust">1000+ network devices</strong>, and surfaced{' '}
                <strong className="font-semibold text-rust">$8M+ in cost savings</strong> on a $44M Arista
                infrastructure project.
              </p>
              <p>
                I'm most comfortable at the backend and cloud layer — designing data pipelines,
                containerised services, and the kind of internal tooling that makes engineering teams
                dramatically more productive.
              </p>
            </motion.div>

            {/* Education + focus */}
            <motion.div
              {...reveal(0.44)}
              animate={inView ? reveal(0.44).animate : reveal(0.44).initial}
              className="grid grid-cols-2 gap-6 border-t border-line pt-7"
            >
              {[
                { label: 'Degree',  value: personal.education },
                { label: 'School',  value: personal.school },
                { label: 'Focus',   value: 'Backend · Cloud · IoT' },
                { label: 'Contact', value: personal.email },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="font-sans text-[0.58rem] uppercase tracking-[0.2em] text-dim block mb-1">{label}</span>
                  <span className="font-sans text-[0.84rem] text-ink">{value}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
