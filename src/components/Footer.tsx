export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-line px-6 sm:px-8 md:px-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <span className="font-sans text-[0.68rem] text-dim text-center sm:text-left">
        © 2026 Harsh Tamakuwala —{' '}
        <em className="font-display italic">Designed &amp; built with care.</em>
      </span>
      <button
        onClick={scrollTop}
        className="font-sans text-[0.68rem] text-dim hover:text-rust transition-colors underline-grow"
        data-cursor
      >
        Back to top ↑
      </button>
    </footer>
  )
}
