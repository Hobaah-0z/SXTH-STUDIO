import { Link } from 'react-router-dom'
import Logo from './Logo'

const FOOTER_LINKS = [
  { label: 'PRIVACY', href: '#' },
  { label: 'TERMS', href: '#' },
]

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-paper px-4 pb-4 pt-4 text-[#433207] sm:px-6 sm:pb-6 sm:pt-6 md:px-8 md:pb-8 md:pt-8">
      <div className="mx-auto max-w-[1600px] overflow-hidden rounded-[18px] bg-[#ffcc03] px-5 pb-0 pt-8 sm:px-7 sm:pt-9 md:px-10 md:pt-10 lg:rounded-[22px]">
        <div className="grid grid-cols-1 gap-9 pb-8 sm:grid-cols-3 sm:gap-8 md:pb-10">
          <div>
            <p className="mb-4 text-[9px] font-semibold uppercase leading-[1.15] tracking-[0.02em] sm:text-[10px]">
              SXTH STUDIO
            </p>
            <ul className="flex flex-col gap-1.5 text-[9px] font-medium uppercase leading-[1.15] tracking-[0.02em] sm:text-[10px]">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-opacity duration-300 hover:opacity-55">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 text-[9px] font-medium leading-[1.25] sm:text-[10px]">
            <div>
              <p className="mb-1 font-semibold uppercase tracking-[0.02em]">Creative Studio</p>
              <p className="max-w-[180px] opacity-75">
                Brand, digital and creative direction for ambitious ideas.
              </p>
            </div>
            <a
              href="mailto:hello@sxth.studio"
              className="w-fit transition-opacity duration-300 hover:opacity-55"
            >
              hello@sxth.studio
            </a>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[9px] uppercase tracking-[0.02em] sm:text-[10px]">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a href={social.href} className="transition-opacity duration-300 hover:opacity-55">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="max-w-[190px] text-[10px] font-bold uppercase leading-[1.05] tracking-[-0.02em] sm:text-[11px] md:text-[12px]">
              EMAILS AREN&apos;T THE WORST
              <br />
              EXCEPT WHEN THEY&apos;RE BORING.
            </p>
            <p className="mt-2 max-w-[220px] text-[8px] leading-[1.3] opacity-70 sm:text-[9px]">
              Get occasional notes from SXTH — new work, ideas and things worth seeing.
            </p>
            <form
              className="mt-5 flex items-center border-b border-[#433207]/45 pb-1"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="min-w-0 flex-1 bg-transparent text-[9px] text-[#433207] outline-none placeholder:text-[#433207]/65 sm:text-[10px]"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="ml-3 text-[12px] leading-none transition-transform duration-300 hover:translate-x-0.5"
              >
                ↗
              </button>
            </form>
          </div>
        </div>

        <div className="relative h-[25vw] min-h-[155px] max-h-[390px] overflow-hidden border-t border-[#433207]/15 pt-3 sm:h-[23vw] md:h-[21vw]">
          <Link to="/" aria-label="SXTH home" className="absolute inset-x-0 bottom-[-8vw] block sm:bottom-[-7vw] md:bottom-[-6vw]">
            <Logo
              variant="dark"
              className="h-auto w-full scale-[0.95] origin-bottom-center"
            />
          </Link>
        </div>

        <div className="flex items-center justify-between border-t border-[#433207]/15 py-3 text-[8px] font-medium uppercase tracking-[0.04em] sm:text-[9px]">
          <span>© 2026 SXTH</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
