import RevealLines from './motion/RevealLines'
import ImagePlaceholder from './ImagePlaceholder'

// Centered statement over a faded background image — mirrors the
// "guided by creative experts" moment.
export default function StatementBand() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 text-center text-paper md:py-40">
      <div className="absolute inset-0 opacity-20">
        <ImagePlaceholder
          src="/images/studio/statement.jpg"
          alt=""
          label="Statement background"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <RevealLines
          lines={['DRIVEN BY', 'CURIOUS MAKERS.']}
          className="text-[10vw] font-medium leading-[1] tracking-tightest sm:text-[6vw] md:text-[4.2vw]"
        />
        <p className="mx-auto mt-8 max-w-lg text-[15px] leading-relaxed text-muted-inv md:text-[17px]">
          Every project is led by people who still get excited about the
          work — not just the outcome.
        </p>
      </div>
    </section>
  )
}
