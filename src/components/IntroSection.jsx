import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import RevealLines from './motion/RevealLines'

export default function IntroSection() {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 10%'] })
  const x = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : ['7%','-5%'])
  return (
    <section ref={ref} className="overflow-hidden border-b border-line-inv bg-white px-6 py-28 text-paper md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 md:mb-16"><span className="text-[12px] uppercase tracking-widest2 text-paper/50">A studio for what comes next</span></div>
        <motion.div style={{ x }} className="w-max"><RevealLines lines={['THE SIXTH IS', 'WHERE CREATION', 'BEGINS.']} className="text-[16vw] leading-[0.82] tracking-tightest sm:text-[12vw] md:text-[9vw]" weightFrom={300} weightTo={700} /></motion.div>
        <div className="mt-12 flex justify-start md:mt-20"><p className="max-w-md text-[15px] leading-relaxed text-paper/65 md:text-[17px]">We turn ideas into identities, digital experiences and campaigns that people can see, feel and remember.</p></div>
      </div>
    </section>
  )
}
