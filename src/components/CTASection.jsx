import { useReveal } from '../hooks/useReveal'

export default function CTASection() {
  const [ref, visible] = useReveal()

  return (
    <section className="border-t border-line bg-paper px-6 py-28 md:px-10 md:py-40">
      <div ref={ref} className={`reveal mx-auto max-w-[1600px] ${visible ? 'is-visible' : ''}`}>
        <h2 className="text-[12vw] font-medium leading-[0.9] tracking-tightest sm:text-[9vw] md:text-[7.5vw]">
          WHAT SHALL
          <br />
          WE MAKE?
        </h2>

        <a
          href="mailto:hello@sxth.studio"
          className="mt-12 inline-flex items-center gap-3 text-[14px] uppercase tracking-widest2 md:mt-16"
        >
          <span className="border-b border-ink pb-1">Start a project</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
