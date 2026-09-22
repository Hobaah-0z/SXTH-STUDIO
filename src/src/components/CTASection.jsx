import { useReveal } from '../hooks/useReveal'
import RevealLines from './motion/RevealLines'
import Magnetic from './motion/Magnetic'

export default function CTASection() {
  const [ref, visible] = useReveal()

  return (
    <section className="border-t border-line bg-paper px-6 py-28 md:px-10 md:py-40">
      <div ref={ref} className={`reveal mx-auto max-w-[1600px] ${visible ? 'is-visible' : ''}`}>
        <RevealLines
          lines={['WHAT SHALL', 'WE MAKE?']}
          className="text-[12vw] font-medium leading-[0.9] tracking-tightest sm:text-[9vw] md:text-[7.5vw]"
        />

        <Magnetic strength={0.4} range={80} className="mt-12 md:mt-16">
          <a
            href="mailto:hello@sxth.studio"
            className="group inline-flex items-center gap-3 text-[14px] uppercase tracking-widest2 transition-colors duration-300 hover:text-accent"
          >
            <span className="border-b border-current pb-1">Start a project</span>
            <span aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </section>
  )
}
