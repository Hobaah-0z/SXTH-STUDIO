import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroText from './HeroText'

export default function Hero({ onReady }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaScale = useTransform(scrollYProgress, [0, 1], reduced ? [1,1] : [1,1.12])
  const mediaY = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0,70])
  const contentY = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [0,-80])
  const contentOpacity = useTransform(scrollYProgress, [0,0.75,1], reduced ? [1,1,1] : [1,0.65,0])

  return (
    <section ref={ref} id="top" className="relative h-[100svh] w-full overflow-hidden bg-black">
      <motion.div style={{ scale: mediaScale, y: mediaY }} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/sxth-creation-poster.jpg"
          preload="auto"
          onCanPlayThrough={onReady}
        >
          <source src="/videos/sxth-creation.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative flex h-full w-full flex-col justify-end px-6 pb-10 md:px-10 md:pb-14">
        <div className="flex items-end justify-between gap-6">
          <div className="hidden max-w-xs md:block"><span className="text-[11px] uppercase tracking-widest2 text-white/65">Independent creative studio</span><p className="mt-3 text-[14px] leading-relaxed text-white/70">Brands, digital experiences, products and visual worlds for people building what comes next.</p></div>
          <HeroText reducedMotion={reduced} />
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex"><span className="text-[10px] uppercase tracking-widest2">Scroll</span><span className="h-8 w-px bg-white/50" aria-hidden="true" /></div>
    </section>
  )
}
