import { useReducedMotion } from 'framer-motion'

export default function Marquee({ children, direction = 'left', duration = 28, className = '', itemClassName = '' }) {
  const reduced = useReducedMotion()
  const items = Array.isArray(children) ? children : [children]
  const style = reduced
    ? undefined
    : { '--marquee-duration': `${duration}s` }

  return (
    <div className={`sxth-marquee overflow-hidden whitespace-nowrap ${className}`} style={style}>
      <div
        className={`sxth-marquee-track flex w-max ${direction === 'right' ? 'sxth-marquee-right' : ''}`}
        style={{ animationPlayState: reduced ? 'paused' : 'running' }}
      >
        {[0, 1].map(copy => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <span key={`${copy}-${i}`} className={itemClassName}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
