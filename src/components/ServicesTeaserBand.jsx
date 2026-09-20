import { Link } from 'react-router-dom'
import RevealLines from './motion/RevealLines'
import Magnetic from './motion/Magnetic'

// Orange-to-cream panel that bridges into the full ServicesSection further
// down the page — mirrors "the services await you" moment.
export default function ServicesTeaserBand() {
  return (
    <section className="bg-gradient-to-b from-accent to-paper px-6 pb-16 pt-20 md:px-14 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <RevealLines
          lines={['THE CRAFT', 'AWAITS.']}
          className="text-[11vw] font-medium leading-[0.95] tracking-tightest text-ink sm:text-[7vw] md:text-[5vw]"
        />

        <div className="mt-10 flex flex-col items-start gap-4 bg-paper p-6 md:mt-14 md:max-w-md md:p-8">
          <span className="text-[12px] uppercase tracking-widest2 text-muted">
            Four disciplines
          </span>
          <p className="text-[15px] leading-relaxed text-ink/80">
            Strategy, brand, digital and campaign — worked together, not
            handed off between departments.
          </p>
          <Magnetic strength={0.3} range={60}>
            <Link
              to="/#services"
              className="text-[13px] uppercase tracking-widest2 underline underline-offset-4 transition-colors hover:text-accent"
            >
              See the services →
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
