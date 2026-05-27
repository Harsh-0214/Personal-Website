import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { personal, stats } from '../data/resume'

/* Staggered entrance variant */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.75, ease: [0.25, 1, 0.5, 1] } },
})

/* Decorative squiggle SVG */
function Squiggle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80" height="10" viewBox="0 0 80 10" fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 7 Q10 2 20 7 Q30 12 40 7 Q50 2 60 7 Q70 12 80 7"
        stroke="currentColor" strokeWidth="1.5" fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Hero() {
  const goDown = useCallback(() => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg pt-20 md:pt-0"
    >
      {/* Decorative large background letter — desktop only */}
      <div
        className="hidden lg:block absolute right-[-2%] top-1/2 -translate-y-1/2 font-display italic text-ink/[0.03] select-none pointer-events-none leading-none z-0"
        style={{ fontSize: 'clamp(18rem, 38vw, 52rem)' }}
        aria-hidden="true"
      >
        H
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-14 w-full">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.15)} className="flex items-center gap-4 mb-8 md:mb-10">
          <div className="w-10 h-px bg-line flex-shrink-0" />
          <span className="font-sans text-[0.72rem] text-dim uppercase tracking-[0.2em]">
            {personal.eyebrow}
          </span>
        </motion.div>

        {/* Headline — the name, large serif */}
        <div className="mb-8 md:mb-10 overflow-hidden">
          <motion.h1
            className="font-display text-ink leading-[0.88] tracking-[-0.01em]"
            style={{ fontSize: 'clamp(3rem, 10.5vw, 9.5rem)' }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.9, ease: [0.25, 1, 0.5, 1] } }}
          >
            {personal.firstName}
            <br />
            <em className="italic">{personal.lastName}.</em>
          </motion.h1>
        </div>

        {/* Squiggle accent */}
        <motion.div {...fadeUp(0.5)} className="mb-8 md:mb-10">
          <Squiggle className="text-rust" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.6)}
          className="font-sans text-mid text-[1rem] md:text-[1.1rem] leading-relaxed max-w-[520px] mb-10 md:mb-12"
        >
          {personal.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.72)} className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-sans text-[0.82rem] font-medium px-7 py-3.5 bg-rust text-bg hover:bg-ink transition-colors duration-200 rounded-sm"
            data-cursor
          >
            View Projects
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-sans text-[0.82rem] text-mid hover:text-rust transition-colors flex items-center gap-2 group"
            data-cursor
          >
            Get in touch
            <span className="transition-transform duration-200 group-hover:translate-x-1.5">→</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom bar: scroll + stats */}
      <div className="absolute bottom-8 left-6 sm:left-8 md:left-14 right-6 sm:right-8 md:right-14 flex items-end justify-between">

        {/* Scroll cue */}
        <motion.button
          onClick={goDown}
          aria-label="Scroll down"
          className="flex items-center gap-3 text-dim hover:text-rust transition-colors group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.1, duration: 0.6 } }}
          data-cursor
        >
          <div className="w-10 h-px bg-line relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-rust"
              animate={{ x: ['-100%', '110%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay: 1.5 }}
            />
          </div>
          <span className="font-sans text-[0.62rem] uppercase tracking-[0.2em]">Scroll</span>
        </motion.button>

        {/* Stats — desktop only */}
        <motion.div
          className="hidden md:flex gap-8 lg:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.0, duration: 0.6 } }}
        >
          {stats.map(s => (
            <div key={s.label} className="text-right">
              <span className="font-display text-ink text-2xl block leading-none">{s.value}</span>
              <span className="font-sans text-[0.62rem] uppercase tracking-[0.12em] text-dim">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
