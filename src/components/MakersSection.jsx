import { makers } from '../data/makers'
import { useReveal } from '../hooks/useReveal'

function Maker({ maker }) {
  const [ref, visible] = useReveal()

  return (
    <div
      ref={ref}
      className={`reveal border-t border-line py-12 first:border-t-0 md:py-16 ${
        visible ? 'is-visible' : ''
      }`}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-6 md:gap-10">
          <span className="mt-2 text-[12px] uppercase tracking-widest2 text-muted">
            {maker.id}
          </span>
          <div>
            <h3 className="text-[7vw] font-medium leading-none tracking-tightest sm:text-[4vw] md:text-[2.4vw]">
              {maker.name}
            </h3>
            <span className="mt-3 block text-[13px] uppercase tracking-widest2 text-muted">
              {maker.role}
            </span>
          </div>
        </div>

        <div className="max-w-sm space-y-3 md:pt-2">
          <p className="text-[15px] leading-relaxed text-muted">{maker.about}</p>
          <p className="text-[13px] leading-relaxed text-muted/80">{maker.experience}</p>
        </div>
      </div>
    </div>
  )
}

export default function MakersSection() {
  return (
    <section className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-2 block text-[12px] uppercase tracking-widest2 text-accent">
          The Makers
        </span>
        <div className="mt-8">
          {makers.map((maker) => (
            <Maker key={maker.id} maker={maker} />
          ))}
        </div>
      </div>
    </section>
  )
}
