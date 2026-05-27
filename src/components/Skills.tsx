import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { skills, skillCategories, marqueeRow1, marqueeRow2 } from '../data/resume'
import { techIconMap } from '../data/techIcons'
import { SectionHead } from './About'

function TechIcon({ name }: { name: string }) {
  const Icon = techIconMap[name]
  if (!Icon) return null
  return <Icon className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
}

/* Deterministic tilt for organic feel */
const TILTS = [-1.5, -0.8, 0, 0.6, 1.2, 0.4, -1.1, 0.9, -0.5, 1.4]
const getTilt = (i: number) => TILTS[i % TILTS.length]

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden py-3">
      <div
        className={`flex items-center ${reverse ? 'animate-belt-r' : 'animate-belt-l'}`}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.animationPlayState = 'running'}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 font-display italic text-[1rem] text-mid whitespace-nowrap hover:text-ink transition-colors cursor-default select-none"
          >
            <TechIcon name={s} />
            {s}
            <span className="text-rust ml-2 not-italic font-sans">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const displayed = activeCategory === 'All'
    ? Object.values(skills).flat()
    : skills[activeCategory] ?? []

  return (
    <section id="skills" className="bg-bg">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHead num="03" title="Skills" />
        </motion.div>
      </div>

      {/* Editorial marquee — slow, italic serif */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="border-y border-line"
      >
        <MarqueeRow items={marqueeRow1} />
        <div className="border-t border-line-faint" />
        <MarqueeRow items={marqueeRow2} reverse />
      </motion.div>

      {/* Filter + tags */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 py-12 md:py-16">

        {/* Category filter — editorial text tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-wrap gap-x-6 gap-y-2 mb-10 border-b border-line pb-6"
        >
          {skillCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor
              className={`font-sans text-[0.78rem] transition-all duration-200 pb-0.5 ${
                activeCategory === cat
                  ? 'text-rust border-b border-rust'
                  : 'text-dim hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill tags — organically tilted */}
        <motion.div layout className="flex flex-wrap gap-2.5 md:gap-3">
          <AnimatePresence mode="popLayout">
            {displayed.map((skill, i) => (
              <motion.span
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                style={{ rotate: getTilt(i) }}
                className="inline-flex items-center gap-1.5 font-sans text-[0.75rem] px-3.5 py-2 border border-line text-mid bg-surface hover:border-rust hover:text-ink hover:bg-rust/[0.04] transition-all duration-200 cursor-default rounded-sm"
              >
                <TechIcon name={skill} />
                {skill}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
