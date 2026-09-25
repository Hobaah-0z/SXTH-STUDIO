import RevealLines from './motion/RevealLines'
import ImagePlaceholder from './ImagePlaceholder'
import { useReveal } from '../hooks/useReveal'

// A split panel: statement on the left, an asymmetric photo collage on the
// right. Replaces the plain IntroSection with a richer version of the same
// message.
const COLLAGE = [
  { label: 'Studio', image: '/images/studio/01.jpg', span: 'col-span-2 row-span-2' },
  { label: 'Process', image: '/images/studio/02.jpg', span: 'col-span-1 row-span-1' },
  { label: 'Craft', image: '/images/studio/03.jpg', span: 'col-span-1 row-span-1' },
  { label: 'Team', image: '/images/studio/04.jpg', span: 'col-span-1 row-span-1' },
  { label: 'Detail', image: '/images/studio/05.jpg', span: 'col-span-1 row-span-1' },
]

export default function SplitIntro() {
  const [ref, visible] = useReveal()

  return (
    <section className="grid bg-ink text-paper md:grid-cols-2">
      <div
        ref={ref}
        className={`reveal flex flex-col justify-center gap-6 px-6 py-20 md:px-14 md:py-0 ${
          visible ? 'is-visible' : ''
        }`}
      >
        <RevealLines
          lines={['THE SIXTH IS WHERE', 'CREATION BEGINS.']}
          className="max-w-lg text-[10vw] font-medium leading-[0.98] tracking-tightest sm:text-[6vw] md:text-[3.4vw]"
        />
        <p className="max-w-sm text-[15px] leading-relaxed text-muted-inv md:text-[17px]">
          SXTH is a design studio creating brands, digital experiences,
          products and visual worlds for people building what comes next.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 p-2 [grid-auto-rows:120px] md:gap-3 md:p-3 md:[grid-auto-rows:160px]">
        {COLLAGE.map((item) => (
          <div key={item.label} className={`relative overflow-hidden ${item.span}`}>
            <ImagePlaceholder
              src={item.image}
              alt={item.label}
              label={item.label}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
