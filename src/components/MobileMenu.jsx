import { useEffect } from 'react'

export default function MobileMenu({ open, onClose, links }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 bg-ink text-paper transition-opacity duration-400 ease-editorial md:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="text-[15px] font-medium tracking-tighter">SXTH</span>
        <button
          type="button"
          onClick={onClose}
          className="text-[12px] uppercase tracking-widest2"
          aria-label="Close menu"
        >
          Close
        </button>
      </div>

      <nav className="flex h-[calc(100%-88px)] flex-col justify-center gap-2 px-6">
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="border-t border-line-inv py-5 text-[13vw] font-medium leading-none tracking-tightest first:border-t-0"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
