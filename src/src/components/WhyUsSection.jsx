import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { whyUsPoints } from '../data/whyUs'

// Presentational-only scatter: alternating tilt and vertical lift per card
// index, so the grid reads as loosely scattered notes rather than a rigid
// row/column layout, while still reflowing cleanly at any width.
const TILTS = [-3, 2, -4, 3, -2, 4, -3, 2, -2, 3, -4]
const LIFTS = ['md:mt-0', 'md:mt-12', 'md:mt-3', 'md:mt-16', 'md:mt-6', 'md:mt-1', 'md:mt-14', 'md:mt-4', 'md:mt-10', 'md:mt-0', 'md:mt-8']

// "Weight" is a stand-in for mass: longer statements read as heavier cards,
// so they fall a touch slower and settle with a bigger, softer thud, while
// short ones drop quick and snappy. Purely a design cue, not real physics.
function weightOf(text) {
  const words = text.trim().split(/\s+/).length
  if (words <= 6) return 0.7
  if (words <= 10) return 1
  return 1.35
}

export default function WhyUsSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="border-t border-line bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-10 block text-center text-[12px] uppercase tracking-widest2 text-accent-soft md:mb-16">
          Why Us
        </span>

        <h2 className="mb-16 text-center text-[13vw] font-medium leading-[0.9] tracking-tightest sm:text-[9vw] md:mb-20 md:text-[6vw]">
          Why Us?
        </h2>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {whyUsPoints.map((point, i) => {
            const mass = weightOf(point)
            const tilt = TILTS[i % TILTS.length]
            const lift = LIFTS[i % LIFTS.length]

            return (
              <motion.div
                key={point}
                className={`w-[260px] shrink-0 rounded-xl border border-line bg-paper px-5 py-5 shadow-[0_20px_45px_-22px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-accent sm:w-[280px] ${lift}`}
                initial={reducedMotion ? { opacity: 0, rotate: tilt } : { opacity: 0, y: -180, rotate: tilt * 4.5 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: tilt,
                }}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  reducedMotion
                    ? { duration: 0.4, delay: i * 0.03 }
                    : {
                        type: 'spring',
                        stiffness: 240 - mass * 70,
                        damping: 9 + mass * 5,
                        mass,
                        delay: i * 0.07,
                      }
                }
              >
                <p className="text-[15px] leading-snug text-ink">{point}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
