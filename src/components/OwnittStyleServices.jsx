import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { services } from '../data/services'
import Marquee from './motion/Marquee'

export default function OwnittStyleServices() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
  const x = useTransform(progress, [0, 1], ['2%', '-8%'])

  return (
    <section id="services" ref={ref} className="overflow-hidden bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between border-b border-line pb-5 md:mb-14">
          <span className="text-[12px] uppercase tracking-widest2 text-accent">What shall we make?</span>
          <span className="text-[12px] uppercase tracking-widest2 text-muted">04 disciplines</span>
        </div>

        <motion.div style={{ x }} className="mb-14 md:mb-20">
          <Marquee
            duration={30}
            itemClassName="mx-4 text-[6vw] font-medium leading-none tracking-tightest md:mx-6 md:text-[3.2vw]"
          >
            {services.map((service, i) => (
              <span key={`service-ticker-${service.id}`} className="inline-flex items-center gap-5 md:gap-8">
                <span className="text-[4vw] text-accent md:text-[2.5vw]">{String(i + 1).padStart(2, '0')}</span>
                {service.heading}
                <span className="text-accent">✳</span>
              </span>
            ))}
          </Marquee>
        </motion.div>

        <div className="border-t border-line">
          {services.map((service, i) => <ServiceRow key={service.id} service={service} index={i} />)}
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 92%', 'end 25%'] })
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.45, 1, 1])
  const x = useTransform(scrollYProgress, [0, 0.4, 1], [28, 0, -8])

  return (
    <motion.div ref={ref} style={{ opacity, x }} className="group border-b border-line py-8 md:py-10">
      <div className="grid grid-cols-[auto_1fr] gap-5 md:grid-cols-[4rem_1fr_0.7fr] md:gap-10">
        <span className="pt-2 text-[11px] uppercase tracking-widest2 text-muted">{String(index + 1).padStart(2, '0')}</span>
        <h3 className="text-[10vw] font-medium leading-[0.82] tracking-tightest transition-transform duration-500 ease-editorial group-hover:translate-x-3 sm:text-[7vw] md:text-[4.5vw]">
          {service.heading}
        </h3>
        <div className="col-start-2 mt-4 flex max-w-md flex-col gap-5 md:col-start-auto md:mt-2">
          <p className="text-[15px] leading-relaxed text-muted md:text-[17px]">{service.description}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] uppercase tracking-widest2 text-accent">
            {service.disciplines.map(d => <span key={d}>{d}</span>)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
