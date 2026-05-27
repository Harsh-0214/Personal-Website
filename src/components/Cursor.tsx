import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const pos  = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const raf  = useRef<number>(0)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      raf.current = requestAnimationFrame(lerp)
    }
    raf.current = requestAnimationFrame(lerp)

    document.addEventListener('mousemove', onMove)

    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    // Re-query on each mount so dynamically-added elements are covered
    const bindHover = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    bindHover()

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-rust transition-all duration-100"
        style={{ width: hovered ? 10 : 5, height: hovered ? 10 : 5, opacity: hovered ? 0.7 : 1 }}
      />
      {/* Ring — lags behind cursor */}
      <div
        ref={ringRef}
        className="fixed z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-rust/30 transition-all duration-200"
        style={{ width: hovered ? 40 : 28, height: hovered ? 40 : 28 }}
      />
    </>
  )
}
