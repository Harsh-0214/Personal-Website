export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-line-subtle px-6 sm:px-8 md:px-14 py-5 md:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[0.6rem] md:text-[0.63rem] text-text-lo tracking-wider">
      <span className="text-center sm:text-left">
        © 2026 Harsh Tamakuwala — Designed &amp; built with React + Framer Motion.
      </span>
      <button onClick={scrollTop} className="hover:text-accent transition-colors" data-cursor>
        Back to top ↑
      </button>
    </footer>
  )
}
