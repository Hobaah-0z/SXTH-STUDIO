// Cream panel with a short bullet list of who SXTH works with — mirrors
// the "one-on-one mentoring" panel's structure.
const AUDIENCES = [
  {
    title: 'FOR FOUNDERS',
    text: 'Early-stage brands that need an identity and a digital presence built at the same time, by the same team.',
  },
  {
    title: 'FOR BRANDS',
    text: 'Established companies ready to rethink how they look, sound and show up across every touchpoint.',
  },
  {
    title: 'FOR AGENCIES',
    text: 'Partners who need an extra design or motion team for a project without growing headcount.',
  },
]

export default function AudienceSection() {
  return (
    <section className="border-t border-line bg-paper px-6 py-20 md:px-14 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <div>
            <h2 className="max-w-md text-[8vw] font-medium leading-[1.05] tracking-tightest sm:text-[5vw] md:text-[2.6vw]">
              WHO WE WORK WITH
            </h2>
            <div className="mt-6 flex gap-1" aria-hidden="true">
              <span className="h-8 w-2 bg-ink" />
              <span className="h-8 w-2 bg-ink" />
              <span className="h-8 w-2 bg-accent" />
            </div>
          </div>

          <div className="grid gap-10 md:max-w-2xl md:grid-cols-3 md:gap-8">
            {AUDIENCES.map((a) => (
              <div key={a.title}>
                <h3 className="text-[13px] uppercase tracking-widest2 text-accent">{a.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
