import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function FlowSection({ children, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'end 5%'] })
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], reduced ? [0,0,0,0] : [42,0,0,-30])
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], reduced ? [1,1,1,1] : [0.985,1,1,0.99])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], reduced ? [1,1,1,1] : [0.55,1,1,0.88])
  const clip = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], reduced ? ['inset(0 0 0 0)','inset(0 0 0 0)','inset(0 0 0 0)','inset(0 0 0 0)'] : ['inset(0 0 12% 0)','inset(0 0 0 0)','inset(0 0 0 0)','inset(0 0 5% 0)'])
  return <section ref={ref} className={`relative ${className}`}><motion.div style={{ y, scale, opacity, clipPath: clip }} className="origin-center will-change-transform">{children}</motion.div></section>
}
