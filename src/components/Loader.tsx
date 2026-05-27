import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 1600
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      {/* Monogram */}
      <motion.div
        className="font-display italic text-ink text-4xl mb-10 select-none"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6, ease: 'easeOut' } }}
      >
        HT<span className="text-rust">.</span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-32 h-px bg-line overflow-hidden">
        <motion.div
          className="h-full bg-rust origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress, transition: { ease: 'linear' } }}
        />
      </div>
    </motion.div>
  )
}
