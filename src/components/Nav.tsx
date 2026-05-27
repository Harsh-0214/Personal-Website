import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

export default function Nav() {
  const [stuck,  setStuck]  = useState(false)
  const [open,   setOpen]   = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.querySelector(l.href))
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) }),
      { threshold: 0.4 }
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
      className={`fixed top-0 left-0 right-0 z-[800] flex items-center justify-between px-8 md:px-14 py-5 transition-all duration-300 ${
        stuck ? 'bg-base/90 backdrop-blur-xl border-b border-line-subtle' : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      <button onClick={() => go('#hero')} className="font-display font-black text-base tracking-widest text-text-hi" data-cursor>
        HT<span className="text-accent">.</span>
      </button>

      {/* Desktop links */}
      <ul className="hidden md:flex gap-8 list-none">
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

      {/* Mobile hamburger */}
      <button
        className="md:hidden relative z-[810] flex flex-col gap-[5px] p-1.5 bg-none border-none"
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed inset-0 bg-raised flex flex-col justify-center px-10 gap-7 md:hidden border-l border-line-subtle"
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
