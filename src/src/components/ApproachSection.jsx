// Dark, three-column section with a highlighted headline — mirrors the
// "tailored mentorship" panel's structure with SXTH's own content.
export default function ApproachSection() {
  return (
    <section className="border-t border-line-inv bg-ink px-6 py-20 text-paper md:px-14 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="max-w-3xl text-[8vw] font-medium leading-[1.05] tracking-tightest sm:text-[5vw] md:text-[3.4vw]">
          THOUGHTFUL PROCESS{' '}
          <span className="inline-block bg-accent px-2 text-ink">&amp; HONEST CRAFT</span>
        </h2>

        <div className="mt-14 grid gap-10 border-t border-line-inv pt-10 md:mt-20 md:grid-cols-3 md:gap-16 md:pt-14">
          <p className="text-[15px] leading-relaxed text-muted-inv md:text-[17px]">
            We treat every brief as a chance to make something that outlives
            the trend it was built for.
          </p>
          <div>
            <h3 className="text-[13px] uppercase tracking-widest2 text-accent">Approach</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-inv">
              Strategy-led, craft-obsessed. We start with what a brand needs
              to say, then build the world it says it in.
            </p>
          </div>
          <div>
            <h3 className="text-[13px] uppercase tracking-widest2 text-accent">Team</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-inv">
              A small, multidisciplinary team across strategy, brand,
              digital and campaign — no handoffs, no dilution.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
