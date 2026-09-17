const LINKS = [
  { label: 'BRAND', href: '#services' },
  { label: 'DIGITAL', href: '#services' },
  { label: 'STRATEGY', href: '#services' },
  { label: 'CAMPAIGN', href: '#services' },
]

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pb-8 pt-16 text-paper md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 border-b border-line-inv pb-12 md:flex-row md:justify-between md:pb-16">
          <span className="text-[15vw] font-medium leading-none tracking-tightest sm:text-[10vw] md:text-[6vw]">
            SXTH
          </span>

          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            <ul className="flex flex-col gap-2 text-[13px] uppercase tracking-widest2 text-muted-inv">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-paper">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 text-[13px] uppercase tracking-widest2 text-muted-inv">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-paper">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-[12px] uppercase tracking-widest2 text-muted-inv md:flex-row md:items-center md:justify-between">
          <span>© 2026 SXTH</span>
          <span>06 — Created to create</span>
        </div>
      </div>
    </footer>
  )
}
