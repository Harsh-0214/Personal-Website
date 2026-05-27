import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { skills, skillCategories, marqueeRow1, marqueeRow2 } from '../data/resume'
import { SectionHead } from './About'

function MarqueeRow({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="flex overflow-hidden border-b border-line-subtle">
      <div
        className={`flex ${reverse ? 'animate-belt-r' : 'animate-belt-l'}`}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.animationPlayState = 'running'}
      >
        {doubled.map((s, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 py-3.5 font-display font-semibold text-[0.9rem] text-text-lo whitespace-nowrap hover:text-text-hi transition-colors cursor-default select-none group">
            <span className="w-1 h-1 rounded-full bg-line-vis group-hover:bg-accent transition-colors" />
            {s}
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
    <section id="skills" className="bg-base">
      <div ref={ref} className="max-w-6xl mx-auto px-8 md:px-14 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHead num="03" title="Skills" />
        </motion.div>
      </div>

      {/* Marquee — full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
        className="border-t border-line-subtle"
      >
        <MarqueeRow items={marqueeRow1} />
        <MarqueeRow items={marqueeRow2} reverse />
      </motion.div>

      {/* Filterable skills */}
      <div className="max-w-6xl mx-auto px-8 md:px-14 py-14">
        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {skillCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-cursor
              className={`font-mono text-[0.65rem] tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'border-accent text-accent bg-accent/10 shadow-[0_0_20px_rgba(0,207,255,0.12)]'
                  : 'border-line-vis text-text-lo hover:border-accent/50 hover:text-text-mid'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill tags with layout animation */}
        <motion.div layout className="flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {displayed.map(skill => (
              <motion.span
                key={skill}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[0.7rem] px-4 py-2 border border-line-vis text-text-mid hover:border-accent/50 hover:text-text-hi hover:bg-accent/5 transition-all duration-200 cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
