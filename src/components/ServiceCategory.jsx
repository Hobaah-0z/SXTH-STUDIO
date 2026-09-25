import { useState } from 'react'
import Magnetic from './motion/Magnetic'

export default function ServiceCategory({ service, index }) {
  const [open, setOpen] = useState(false)
  const number = String(index + 1).padStart(2, '0')

  return (
    <div className="group border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-10 text-left md:py-14"
      >
        <div className="flex items-start gap-6 md:gap-10">
          <span className="mt-2 text-[12px] uppercase tracking-widest2 text-muted transition-colors duration-300 group-hover:text-ink">
            {number}
          </span>
          <h3 className="text-[10vw] font-medium leading-[0.95] tracking-tightest text-muted transition-colors duration-300 group-hover:text-ink sm:text-[6vw] md:text-[4vw]">
            {service.heading}
          </h3>
        </div>
        <Magnetic strength={0.5} range={30} className="mt-2 shrink-0">
          <span
            className={`text-[20px] text-accent transition-transform duration-500 ease-editorial ${
              open ? 'rotate-45' : ''
            }`}
            aria-hidden="true"
          >
            +
          </span>
        </Magnetic>
      </button>

      <div
        className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-editorial"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="min-h-0">
          <div className="flex flex-col gap-8 pb-12 pl-0 md:flex-row md:justify-between md:gap-16 md:pb-16 md:pl-[4.5rem]">
            <p className="max-w-sm text-[16px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink md:text-[18px]">
              {service.description}
            </p>
            <ul className="flex flex-col gap-2 text-[16px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-ink md:text-[18px]">
              {service.disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
