const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-paper px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <a
          href="mailto:hello@sxth.studio"
          className="text-[6vw] font-medium leading-none tracking-tightest sm:text-[3.4vw] md:text-[2vw]"
        >
          hello@sxth.studio
        </a>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-widest2 text-muted">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="hover:text-ink">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
