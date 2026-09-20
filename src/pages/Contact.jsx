import Contact from '../components/Contact'
import PageTransition from '../components/PageTransition'
import RevealLines from '../components/motion/RevealLines'

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44">
        <div className="mx-auto max-w-[1600px]">
          <span className="mb-8 block text-[12px] uppercase tracking-widest2 text-accent">
            Contact
          </span>
          <RevealLines
            lines={["LET'S MAKE", 'SOMETHING.']}
            triggerOnMount
            className="max-w-4xl text-[10vw] font-medium leading-[0.98] tracking-tightest sm:text-[7vw] md:text-[5vw]"
          />
        </div>
      </section>
      <Contact />
    </PageTransition>
  )
}
