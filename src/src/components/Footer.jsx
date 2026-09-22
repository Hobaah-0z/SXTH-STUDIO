import { Link } from 'react-router-dom'
import Logo from './Logo'

const LINKS = [
  { label: 'BRAND', to: '/#services' },
  { label: 'DIGITAL', to: '/#services' },
  { label: 'STRATEGY', to: '/#services' },
  { label: 'CAMPAIGN', to: '/#services' },
]

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-paper px-6 pb-8 pt-16 text-ink md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 border-b border-line pb-12 md:flex-row md:justify-between md:pb-16">
          <Link to="/" className="block">
            <Logo variant="light" className="h-[15vw] w-auto sm:h-[10vw] md:h-[6vw]" />
          </Link>

          <div className="flex flex-col gap-10 md:flex-row md:gap-16">
            <ul className="flex flex-col gap-2 text-[13px] uppercase tracking-widest2 text-muted">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="transition-colors duration-300 hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 text-[13px] uppercase tracking-widest2 text-muted">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="transition-colors duration-300 hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-6 text-[12px] uppercase tracking-widest2 text-muted md:flex-row md:items-center md:justify-between">
          <span>© 2026 SXTH</span>
          <span>06 — Created to create</span>
        </div>
      </div>
    </footer>
  )
}
