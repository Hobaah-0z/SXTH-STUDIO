import { useState } from 'react'
import Magnetic from './motion/Magnetic'

const SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
]

const EMAIL = 'hello@sxth.studio'

function CopyEmail() {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group flex flex-col items-start gap-1 text-left"
      aria-live="polite"
    >
      <span className="text-[6vw] font-medium leading-none tracking-tightest sm:text-[3.4vw] md:text-[2vw]">
        {EMAIL}
      </span>
      <span
        className={`text-[11px] uppercase tracking-widest2 transition-colors duration-300 ${
          copied ? 'text-accent' : 'text-muted group-hover:text-accent'
        }`}
      >
        {copied ? 'Copied to clipboard' : 'Click to copy'}
      </span>
    </button>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-paper px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Magnetic strength={0.25} range={110}>
          <CopyEmail />
        </Magnetic>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] uppercase tracking-widest2 text-muted">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a href={s.href} className="transition-colors duration-300 hover:text-accent">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
