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
    const onScroll = () => setStuck(window.scrollY > 40)
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
      className={`fixed top-0 left-0 right-0 z-[800] flex items-center justify-between px-6 sm:px-8 md:px-14 py-4 md:py-5 transition-all duration-300 ${
        stuck ? 'bg-base/90 backdrop-blur-xl border-b border-line-subtle' : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Logo */}
      <button onClick={() => go('#hero')} className="font-display font-black text-base tracking-widest text-text-hi" data-cursor>
        HT<span className="text-accent">.</span>
      </button>

      {/* Desktop links + theme toggle */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex gap-8 list-none">
          {links.map(l => (
            <li key={l.href}>
              <button
                onClick={() => go(l.href)}
                data-cursor
                className={`font-mono text-[0.68rem] tracking-widest uppercase relative pb-0.5 transition-colors duration-200 ${
                  active === l.href ? 'text-accent' : 'text-text-mid hover:text-accent'
                }`}
              >
                {l.label}
                {active === l.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          data-cursor
          aria-label="Toggle light/dark mode"
          className="w-8 h-8 flex items-center justify-center border border-line-vis text-text-mid hover:border-accent hover:text-accent transition-all duration-200"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Mobile right: theme toggle + hamburger */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
          className="w-8 h-8 flex items-center justify-center border border-line-vis text-text-mid"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <button
          className="relative z-[810] flex flex-col gap-[5px] p-1.5"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          data-cursor
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-text-hi origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-px bg-text-hi"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-text-hi origin-center"
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
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed inset-0 bg-raised flex flex-col justify-center px-8 gap-7 md:hidden border-l border-line-subtle"
          >
            {links.map((l, i) => (
              <motion.button
                key={l.href}
                onClick={() => go(l.href)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 + 0.1 } }}
                className="font-display text-3xl font-bold text-left text-text-mid hover:text-accent transition-colors"
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
