import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { whyUsPoints } from '../data/whyUs'

const TILTS = [-3, 2, -4, 3, -2, 4, -3, 2, -2, 3, -4]
const LIFTS = ['md:mt-0', 'md:mt-12', 'md:mt-3', 'md:mt-16', 'md:mt-6', 'md:mt-1', 'md:mt-14', 'md:mt-4', 'md:mt-10', 'md:mt-0', 'md:mt-8']

function weightOf(text) {
  const words = text.trim().split(/\s+/).length
  if (words <= 6) return 0.7
  if (words <= 10) return 1
  return 1.35
}

function WhyUsCard({ point, index, reducedMotion }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useMotionValue(TILTS[index % TILTS.length])
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.55 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.55 })
  const springRotate = useSpring(rotate, { stiffness: 220, damping: 20, mass: 0.5 })
  const mass = weightOf(point)
  const lift = LIFTS[index % LIFTS.length]

  function reset() {
    x.set(0)
    y.set(0)
    rotate.set(TILTS[index % TILTS.length])
  }

  function push(e) {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const distance = Math.hypot(dx, dy)
    const radius = 190
    if (distance >= radius) {
      reset()
      return
    }
    const strength = (1 - distance / radius) ** 2
    const max = 58 * strength
    const nx = distance ? dx / distance : 0
    const ny = distance ? dy / distance : 0
    x.set(-nx * max)
    y.set(-ny * max)
    rotate.set(TILTS[index % TILTS.length] - nx * 7 * strength)
  }

  return (
    <motion.div
      ref={ref}
      className={`w-[260px] shrink-0 rounded-xl border border-line bg-paper px-5 py-5 shadow-[0_20px_45px_-22px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-accent sm:w-[280px] ${lift}`}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -180, rotate: TILTS[index % TILTS.length] * 4.5 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reducedMotion ? { duration: 0.4, delay: index * 0.03 } : { type: 'spring', stiffness: 240 - mass * 70, damping: 9 + mass * 5, mass, delay: index * 0.07 }}
      style={{ x: springX, y: springY, rotate: springRotate }}
      onPointerMove={push}
      onPointerLeave={reset}
    >
      <p className="text-[15px] leading-snug text-ink">{point}</p>
    </motion.div>
  )
}

export default function WhyUsSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="border-t border-line bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-10 block text-center text-[12px] uppercase tracking-widest2 text-accent-soft md:mb-16">Why Us</span>
        <h2 className="mb-16 text-center text-[13vw] font-medium leading-[0.9] tracking-tightest sm:text-[9vw] md:mb-20 md:text-[6vw]">Why Us?</h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {whyUsPoints.map((point, i) => <WhyUsCard key={point} point={point} index={i} reducedMotion={reducedMotion} />)}
        </div>
      </div>
    </section>
  )
}
