import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/**
 * Slow editorial scroll choreography for the home page.
 * The existing section content and copy stay untouched; this wrapper controls
 * the amount of breathing room and the pace of the transition between scenes.
 */
export default function FlowScene({ children, tone = 'ink', className = '' }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    // A deliberately wider travel range makes each transition feel slower
    // and gives the viewer time to read the scene before it moves on.
    offset: ['start 115%', 'end -15%'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    reducedMotion ? [0, 0, 0, 0] : [32, 0, 0, -24]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    reducedMotion ? [1, 1, 1, 1] : [0.985, 1, 1, 0.99]
  )
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    reducedMotion ? [1, 1, 1, 1] : [0.72, 1, 1, 0.96]
  )
  const radius = useTransform(
    scrollYProgress,
    [0, 0.24, 0.76, 1],
    reducedMotion ? ['0px', '0px', '0px', '0px'] : ['10px', '0px', '0px', '8px']
  )
  const wipeX = useTransform(
    scrollYProgress,
    [0, 0.34, 0.84, 1],
    reducedMotion ? ['100%', '100%', '100%', '100%'] : ['0%', '100%', '100%', '100%']
  )

  const wipeClass = {
    ink: 'bg-ink',
    paper: 'bg-paper',
    accent: 'bg-accent',
  }[tone] || 'bg-ink'

  return (
    <section ref={ref} className={`flow-scene relative ${className}`}>
      <motion.div
        style={{ y, scale, opacity, borderRadius: radius }}
        className="flow-scene-content relative origin-center overflow-hidden will-change-transform"
      >
        <motion.div
          aria-hidden="true"
          style={{ x: wipeX }}
          className={`pointer-events-none absolute inset-y-0 left-0 z-30 w-full origin-left ${wipeClass}`}
        />
        {children}
      </motion.div>
    </section>
  )
}
