import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[15px] h-[15px]">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[15px] h-[15px]">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Nav() {
  const [stuck,  setStuck]  = useState(false)
  const [open,   setOpen]   = useState(false)
  const [active, setActive] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { threshold: 0.3 }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[800] flex items-center justify-between px-6 sm:px-8 md:px-14 py-5 transition-all duration-400 ${
        stuck ? 'glass' : ''
      }`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] } }}
    >
      {/* Wordmark */}
      <button
        onClick={() => go('#hero')}
        className="font-display italic text-ink text-xl leading-none select-none"
        data-cursor
      >
        HT<span className="text-rust not-italic">.</span>
      </button>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-7 list-none">
          {links.map(l => (
            <li key={l.href}>
              <button
                onClick={() => go(l.href)}
                data-cursor
                className={`font-sans text-[0.78rem] relative pb-0.5 transition-colors duration-200 underline-grow ${
                  active === l.href ? 'text-rust' : 'text-mid hover:text-ink'
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          data-cursor
          aria-label="Toggle theme"
          className="text-dim hover:text-ink transition-colors"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Mobile: theme toggle + hamburger */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-dim hover:text-ink transition-colors"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          className="flex flex-col gap-[5px] p-1 relative z-[810]"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          data-cursor
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
            transition={{ duration: 0.22 }}
            className="block w-5 h-px bg-ink origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.18 }}
            className="block w-5 h-px bg-ink"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
            transition={{ duration: 0.22 }}
            className="block w-5 h-px bg-ink origin-center"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: [0.25, 1, 0.5, 1], duration: 0.42 }}
            className="fixed inset-0 bg-bg flex flex-col justify-center px-10 gap-8 md:hidden border-l border-line"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                onClick={() => go(l.href)}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06 + 0.08 } }}
                className="font-display italic text-4xl text-left text-mid hover:text-rust transition-colors"
                data-cursor
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
