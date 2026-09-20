import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Wraps media (usually an image) in a slightly oversized, clipped container
// and translates it as the section scrolls through the viewport — a subtle
// scroll-linked parallax with no gaps at the extremes.
export default function Parallax({ children, amount = 8, className = '' }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, top: `-${amount + 2}%`, bottom: `-${amount + 2}%` }}
        className="absolute inset-x-0"
      >
        {children}
      </motion.div>
    </div>
  )
}
