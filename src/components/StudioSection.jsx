import { useReveal } from '../hooks/useReveal'
import RevealLines from './motion/RevealLines'

export default function StudioSection() {
  const [ref, visible] = useReveal()

  return (
    <section id="studio" className="border-b border-line bg-paper px-6 py-24 md:px-10 md:py-32">
      <div ref={ref} className={`reveal mx-auto max-w-[1600px] ${visible ? 'is-visible' : ''}`}>
        <span className="mb-8 block text-[12px] uppercase tracking-widest2 text-accent">
          The Studio
        </span>

        <RevealLines
          lines={['WE MAKE THINGS', 'WORTH LOOKING AT.']}
          className="max-w-4xl text-[9vw] font-medium leading-[0.98] tracking-tightest sm:text-[6vw] md:text-[4.4vw]"
        />

        <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-[16px] leading-relaxed text-muted md:text-[18px]">
            We are a design studio built around ideas, craft and a healthy
            obsession with making things better. We partner with founders,
            companies and brands to turn ideas into identities, experiences
            and things people remember.
          </p>

          <a
            href="/studio"
            className="shrink-0 text-[13px] uppercase tracking-widest2 underline underline-offset-4"
          >
            About SXTH →
          </a>
        </div>
      </div>
    </section>
  )
}
