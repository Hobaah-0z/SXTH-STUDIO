import { useReveal } from '../hooks/useReveal'
import RevealLines from './motion/RevealLines'

export default function IntroSection() {
  const [ref, visible] = useReveal()

  return (
    <section className="border-b border-line bg-paper px-6 py-28 md:px-10 md:py-40">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-[1600px] ${visible ? 'is-visible' : ''}`}
      >
        <span className="mb-8 block text-[12px] uppercase tracking-widest2 text-accent">
          06 / CREATION
        </span>

        <RevealLines
          lines={['THE SIXTH IS WHERE', 'CREATION BEGINS.']}
          className="max-w-4xl text-[9vw] font-medium leading-[0.98] tracking-tightest sm:text-[6vw] md:text-[4.4vw]"
        />

        <p className="mt-10 max-w-md text-[16px] leading-relaxed text-muted md:mt-14 md:text-[18px]">
          SXTH is a design studio creating brands, digital experiences,
          products and visual worlds for people building what comes next.
        </p>
      </div>
    </section>
  )
}
