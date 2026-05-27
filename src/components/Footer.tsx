export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-line-subtle px-8 md:px-14 py-6 flex items-center justify-between font-mono text-[0.63rem] text-text-lo tracking-wider">
      <span>© 2026 Harsh Tamakuwala — Designed &amp; built with React + Framer Motion.</span>
      <button onClick={scrollTop} className="hover:text-accent transition-colors" data-cursor>
        Back to top ↑
      </button>
    </footer>
  )
}
