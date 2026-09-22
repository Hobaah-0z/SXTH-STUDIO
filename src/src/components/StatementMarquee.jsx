import Marquee from './motion/Marquee'

export default function StatementMarquee() {
  const phrases = ['WE MAKE BRANDS', 'WE BUILD DIGITAL', 'WE CREATE WORLDS', 'WE MOVE CULTURE']
  return (
    <section className="border-b border-line bg-paper py-4 md:py-6">
      <Marquee duration={34} itemClassName="mx-4 text-[9vw] font-medium leading-none tracking-tightest text-white md:mx-6 md:text-[6vw]">
        {phrases.map(phrase => <span key={phrase} className="inline-flex items-center gap-4">{phrase}<span className="text-accent">✳</span></span>)}
      </Marquee>
    </section>
  )
}
