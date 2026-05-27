import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.floor(progress * 100))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      <motion.div
        className="font-display font-black text-accent text-sm tracking-[0.3em] uppercase mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
      >
        HT
      </motion.div>

      <div className="relative w-40 h-px bg-line-vis overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100, transition: { ease: 'linear' } }}
        />
      </div>

      <motion.span
        className="font-mono text-[0.6rem] text-text-lo tracking-widest mt-4 tabular-nums"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
      >
        {count.toString().padStart(3, '0')}
      </motion.span>
    </motion.div>
  )
}
