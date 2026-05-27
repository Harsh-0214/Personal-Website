import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '../data/resume'
import { techIconMap } from '../data/techIcons'
import { SectionHead } from './About'

interface TiltState { rotX: number; rotY: number; glowX: number; glowY: number }

function TechIcon({ name }: { name: string }) {
  const Icon = techIconMap[name]
  if (!Icon) return null
  return <Icon className="w-3 h-3 flex-shrink-0" />
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [tilt, setTilt] = useState<TiltState>({ rotX: 0, rotY: 0, glowX: 50, glowY: 50 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    setTilt({
      rotX: -(y - cy) / 14,
      rotY: (x - cx) / 14,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
    })
  }

  const handleLeave = () => {
    setTilt({ rotX: 0, rotY: 0, glowX: 50, glowY: 50 })
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg)`,
        transition: hovered ? 'transform 0.05s ease' : 'transform 0.5s ease',
        transformStyle: 'preserve-3d',
      }}
      className="relative bg-card border border-line-subtle flex flex-col p-6 md:p-8 overflow-hidden group h-full"
    >
      {/* Dynamic glow spot */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12] transition-opacity"
          style={{
            background: `radial-gradient(circle 180px at ${tilt.glowX}% ${tilt.glowY}%, #00CFFF, transparent)`,
          }}
        />
      )}

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

      <span className="font-mono text-[0.58rem] text-text-lo tracking-widest mb-5 md:mb-6">
        {project.id} — {project.year}
      </span>

      <h3 className="font-display font-bold text-[1.15rem] md:text-[1.3rem] leading-tight tracking-tight mb-3 group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      <p className="font-mono text-[0.74rem] md:text-[0.77rem] text-text-mid leading-relaxed flex-1 mb-5 md:mb-6">
        {project.description}
      </p>

      {/* Stack chips with icons */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-5 md:mb-6">
        {project.stack.map(s => (
          <span
            key={s}
            className="inline-flex items-center gap-1 font-mono text-[0.58rem] md:text-[0.6rem] text-accent px-2 py-1 bg-accent/10 border border-accent/20"
          >
            <TechIcon name={s} />
            {s}
          </span>
        ))}
      </div>

      {/* Highlight metric */}
      <div className="flex items-center gap-2 mb-5 md:mb-6 py-3 border-t border-line-subtle">
        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
        <span className="font-mono text-[0.65rem] text-accent tracking-wider">{project.highlight}</span>
      </div>

      {/* Links */}
      <div className="flex gap-4 md:gap-5">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.67rem] text-text-lo hover:text-accent transition-colors flex items-center gap-2"
          data-cursor
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.67rem] text-text-lo hover:text-accent transition-colors flex items-center gap-2"
            data-cursor
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="bg-base">
      <div ref={ref} className="max-w-6xl mx-auto px-6 sm:px-8 md:px-14 py-16 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionHead num="04" title="Projects" />
        </motion.div>

        {/* Responsive grid: 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line-subtle border border-line-subtle">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
