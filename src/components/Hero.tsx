import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { personal, stats, roles } from '../data/resume'

/* ── Particle canvas ──────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse     = useRef({ x: -999, y: -999 })
  const animRef   = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx    = canvas.getContext('2d')!
    let W = 0, H = 0

    interface Particle { x: number; y: number; vx: number; vy: number; r: number }
    let pts: Particle[] = []

    // Reduce particle count on mobile/small screens
    const getCount = () => Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 12000))

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      pts = Array.from({ length: getCount() }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r:  Math.random() * 1.4 + 0.4,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const LINK   = 128
      const MRANGE = 155

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        const dm   = Math.hypot(p.x - mouse.current.x, p.y - mouse.current.y)
        const glow = dm < MRANGE ? 1 - dm / MRANGE : 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + glow * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,207,255,${0.1 + glow * 0.65})`
        ctx.fill()

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j]
          const d = Math.hypot(p.x - q.x, p.y - q.y)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(0,207,255,${0.06 * (1 - d / LINK)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

/* ── Typewriter ───────────────────────────────────────────────────── */
function Typewriter() {
  const [text,     setText]     = useState('')
  const [roleIdx,  setRoleIdx]  = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const role = roles[roleIdx]
    let t: ReturnType<typeof setTimeout>

    if (!deleting) {
      if (text.length < role.length) {
        t = setTimeout(() => setText(role.slice(0, text.length + 1)), 70)
      } else {
        t = setTimeout(() => setDeleting(true), 2200)
      }
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(s => s.slice(0, -1)), 38)
      } else {
        setDeleting(false)
        setRoleIdx(i => (i + 1) % roles.length)
      }
    }
    return () => clearTimeout(t)
  }, [text, deleting, roleIdx])

  return (
    <span className="text-accent">
      {text}
      <span className="opacity-70 animate-pulse">_</span>
    </span>
  )
}

/* ── Letter animation variants ────────────────────────────────────── */
const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.038, delayChildren: 0.45 } },
}
const letter = {
  hidden: { opacity: 0, y: 50, skewY: 6 },
  show:   { opacity: 1, y: 0,  skewY: 0, transition: { type: 'spring', damping: 14, stiffness: 110 } },
}
const lastNameLetter = {
  hidden: { opacity: 0, y: 50, skewY: 6 },
  show:   { opacity: 1, y: 0,  skewY: 0, transition: { type: 'spring', damping: 14, stiffness: 110 } },
}

export default function Hero() {
  const goDown = useCallback(() => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 sm:px-8 md:px-14 overflow-hidden bg-base pt-20 md:pt-0">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Subtle grid — adapts to theme via CSS var */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgb(var(--c-line-subtle)) 1px,transparent 1px),linear-gradient(90deg,rgb(var(--c-line-subtle)) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)',
          maskImage:       'radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)',
        }}
      />

      {/* Glow orbs */}
      <div
        aria-hidden="true"
        className="absolute top-[-15%] right-[-8%] w-[400px] h-[400px] sm:w-[650px] sm:h-[650px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,207,255,0.07) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'orbA 14s ease-in-out infinite' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-12%] left-[12%] w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,80,255,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[1100px]">
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[0.62rem] sm:text-[0.68rem] text-accent tracking-[0.22em] uppercase flex items-center gap-3 mb-5 md:mb-7"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.7, ease: [0.16,1,0.3,1] } }}
        >
          <span className="w-7 h-px bg-accent flex-shrink-0" />
          {personal.eyebrow}
        </motion.p>

        {/* Name — letter stagger. clamp reduces min to fit phones safely */}
        <h1
          className="font-display font-black leading-[0.88] tracking-[-0.04em] mb-5 md:mb-7 overflow-hidden"
          style={{ fontSize: 'clamp(2.4rem,10.5vw,9.5rem)' }}
        >
          {/* First name */}
          <motion.div variants={container} initial="hidden" animate="show" className="flex overflow-hidden">
            {personal.firstName.split('').map((c, i) => (
              <motion.span key={i} variants={letter} className="inline-block">
                {c}
              </motion.span>
            ))}
          </motion.div>

          {/* Last name — outlined stroke, theme-aware */}
          <motion.div
            variants={{ ...container, show: { ...container.show, transition: { ...container.show.transition, delayChildren: 0.62 } } }}
            initial="hidden"
            animate="show"
            className="flex overflow-hidden"
          >
            {personal.lastName.split('').map((c, i) => (
              <motion.span
                key={i}
                variants={lastNameLetter}
                className="inline-block"
                style={{ WebkitTextStroke: '1.5px var(--c-stroke)', color: 'transparent' }}
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
        </h1>

        {/* Subtitle with typewriter */}
        <motion.div
          className="font-mono text-[0.8rem] sm:text-[0.88rem] text-text-mid leading-loose mb-8 md:mb-10 max-w-[520px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.88, duration: 0.7, ease: [0.16,1,0.3,1] } }}
        >
          <div className="mb-2">
            <Typewriter />
          </div>
          <span className="text-[0.75rem] sm:text-[0.8rem] leading-relaxed text-text-mid/80">{personal.tagline}</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3 md:gap-4 items-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.06, duration: 0.7, ease: [0.16,1,0.3,1] } }}
        >
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-mono text-[0.65rem] sm:text-[0.7rem] font-bold tracking-[0.1em] uppercase px-6 sm:px-8 py-3 sm:py-3.5 bg-accent text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_40px_rgba(0,207,255,0.22)]"
            style={{ clipPath: 'polygon(0 0,calc(100% - 12px) 0,100% 12px,100% 100%,0 100%)' }}
            data-cursor
          >
            View Projects
          </button>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-mono text-[0.65rem] sm:text-[0.7rem] text-text-mid hover:text-accent transition-colors flex items-center gap-2 group"
            data-cursor
          >
            Get in touch
            <span className="transition-transform group-hover:translate-x-1.5">→</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={goDown}
        aria-label="Scroll down"
        className="absolute bottom-7 md:bottom-9 left-6 sm:left-8 md:left-14 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.4, duration: 0.6 } }}
        data-cursor
      >
        <div className="w-10 md:w-12 h-px bg-line-vis relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-accent"
            animate={{ x: ['-100%', '110%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 1.7 }}
          />
        </div>
        <span className="font-mono text-[0.57rem] tracking-[0.2em] uppercase text-text-lo">Scroll</span>
      </motion.button>

      {/* Stats — real metrics, desktop only */}
      <motion.div
        className="absolute bottom-7 md:bottom-9 right-8 md:right-14 hidden md:flex gap-8 lg:gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.3, duration: 0.6 } }}
      >
        {stats.map(s => (
          <div key={s.label} className="text-right">
            <span className="font-display font-black text-xl lg:text-2xl text-text-hi block leading-none">{s.value}</span>
            <span className="font-mono text-[0.57rem] tracking-[0.1em] uppercase text-text-lo">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
