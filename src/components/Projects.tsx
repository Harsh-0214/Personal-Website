import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../data/resume'
import { techIconMap } from '../data/techIcons'
import { SectionHead } from './About'

/* Rest-state tilts per card — physical, like cards fanned on a table */
const CARD_TILTS = [-1.4, 0.9, -0.6]

function TechIcon({ name }: { name: string }) {
  const Icon = techIconMap[name]
  if (!Icon) return null
  return <Icon className="w-3 h-3 flex-shrink-0 opacity-70" />
}

function ProjectCard({ project, tilt }: { project: typeof projects[0]; tilt: number }) {
  return (
    <motion.div
      animate={{ rotate: tilt, y: 0 }}
      whileHover={{ rotate: 0, y: -10 }}
      whileTap={{ y: 4, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
      className="bg-surface border border-line flex flex-col p-7 md:p-8 h-full group rounded-sm"
      style={{ boxShadow: '0 2px 12px rgb(var(--c-ink) / 0.04)' }}
    >
      {/* Card top: id + year */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-dim">
          Project {project.id}
        </span>
        <span className="font-display italic text-dim text-sm">{project.year}</span>
      </div>

      {/* Title */}
      <h3
        className="font-display text-ink leading-snug mb-4 group-hover:text-rust transition-colors duration-200"
        style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)' }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-sans text-[0.84rem] text-mid leading-[1.75] flex-1 mb-6">
        {project.description}
      </p>

      {/* Stack chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.stack.map(s => (
          <span
            key={s}
            className="inline-flex items-center gap-1 font-sans text-[0.65rem] text-dim px-2 py-0.5 border border-line-faint bg-bg rounded-sm"
          >
            <TechIcon name={s} />
            {s}
          </span>
        ))}
      </div>

      {/* Highlight */}
      <div className="flex items-center gap-2.5 py-3.5 border-t border-line-faint mb-5">
        <svg className="w-3 h-3 text-rust flex-shrink-0" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 1l1.5 3 3.3.5-2.4 2.3.6 3.2L6 8.5 3 10l.6-3.2L1.2 4.5 4.5 4z"/>
        </svg>
        <span className="font-display italic text-[0.88rem] text-rust">{project.highlight}</span>
      </div>

      {/* Links */}
      <div className="flex gap-5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[0.72rem] text-dim hover:text-rust transition-colors flex items-center gap-1.5 underline-grow"
          data-cursor
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View Source
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.72rem] text-dim hover:text-rust transition-colors flex items-center gap-1.5 underline-grow"
            data-cursor
          >
            Live Demo →
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="bg-bg">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 py-16 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHead num="04" title="Projects" />
        </motion.div>

        {/* Card grid — staggered entrance, each card at a different rest tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.14 + 0.15, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <ProjectCard project={p} tilt={CARD_TILTS[i] ?? 0} />
            </motion.div>
          ))}
        </div>

        {/* Editorial footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-sans text-[0.68rem] text-dim text-center mt-10 md:mt-12"
        >
          Hover a card to straighten it — like picking it up off a table.
        </motion.p>
      </div>
    </section>
  )
}
