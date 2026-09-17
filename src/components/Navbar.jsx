import { useState } from 'react'
import { useScrolled } from '../hooks/useScrolled'
import MobileMenu from './MobileMenu'

const LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'STUDIO', href: '#studio' },
  { label: 'SERVICES', href: '#services' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ease-editorial ${
          scrolled ? 'bg-paper/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10"
          aria-label="Primary"
        >
          <a
            href="#top"
            className={`text-[15px] font-medium tracking-tighter transition-colors duration-500 ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
          >
            SXTH
          </a>

          <ul
            className={`hidden items-center gap-8 text-[12px] uppercase tracking-widest2 md:flex transition-colors duration-500 ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
          >
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`text-[12px] uppercase tracking-widest2 md:hidden transition-colors duration-500 ${
              scrolled ? 'text-ink' : 'text-white'
            }`}
            onClick={() => setOpen(true)}
            aria-haspopup="true"
            aria-expanded={open}
            aria-label="Open menu"
          >
            Menu
          </button>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} links={LINKS} />
    </>
  )
}
