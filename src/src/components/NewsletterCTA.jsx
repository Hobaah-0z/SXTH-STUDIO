import RevealLines from './motion/RevealLines'

const TICKER_ITEMS = Array.from({ length: 6 })

// Orange CTA panel with a looping newsletter marquee underneath — mirrors
// the "get in touch" + subscribe-strip moment.
export default function NewsletterCTA() {
  return (
    <section className="bg-accent text-ink">
      <div className="px-6 py-24 text-center md:py-32">
        <RevealLines
          lines={['STAY CLOSE TO', 'WHAT WE MAKE.']}
          className="mx-auto max-w-3xl text-[10vw] font-medium leading-[0.98] tracking-tightest sm:text-[6vw] md:text-[4.4vw]"
        />

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row md:mt-14"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Your email"
            className="w-full border border-ink/30 bg-transparent px-4 py-3 text-[14px] placeholder:text-ink/50 focus:border-ink focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 border border-ink px-6 py-3 text-[13px] uppercase tracking-widest2 transition-colors hover:bg-ink hover:text-accent"
          >
            Subscribe
          </button>
        </form>
      </div>

      <div className="overflow-hidden border-t border-ink/20 bg-paper py-3">
        <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-10 whitespace-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-10" aria-hidden={group === 1}>
              {TICKER_ITEMS.map((_, i) => (
                <span
                  key={i}
                  className="text-[12px] uppercase tracking-widest2 text-ink/70"
                >
                  Subscribe to the newsletter •
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
