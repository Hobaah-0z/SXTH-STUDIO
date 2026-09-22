import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const DEFAULT_WORDS = ['CREATE', 'MOVE', 'BUILD', 'MAKE']

export default function ScrollWordField({ words = DEFAULT_WORDS }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : ['8%', '-18%'])
  const x2 = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : ['-12%', '12%'])
  const rotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-2, 2])
  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-paper py-8 md:py-12">
      <motion.div style={{ x, rotate }} className="flex w-max items-center gap-5 md:gap-8">
        {words.concat(words).map((word, i) => <span key={`${word}-a-${i}`} className="text-[17vw] font-medium leading-[0.78] tracking-tightest text-white md:text-[12vw]">{word}</span>)}
      </motion.div>
      <motion.div style={{ x: x2 }} className="mt-5 flex w-max items-center gap-5 md:mt-8 md:gap-8">
        {words.concat(words).reverse().map((word, i) => <span key={`${word}-b-${i}`} className="text-[17vw] font-medium leading-[0.78] tracking-tightest text-white/10 md:text-[12vw]">{word}</span>)}
      </motion.div>
    </section>
  )
}
