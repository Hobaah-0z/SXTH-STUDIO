import { motion, useReducedMotion } from 'framer-motion'

export default function Marquee({ children, direction = 'left', duration = 28, className = '', itemClassName = '' }) {
  const reduced = useReducedMotion()
  const items = Array.isArray(children) ? children : [children]
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="flex w-max"
        animate={reduced ? undefined : { x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={reduced ? undefined : { duration, ease: 'linear', repeat: Infinity }}
      >
        {[0, 1].map(copy => (
          <div key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => <span key={`${copy}-${i}`} className={itemClassName}>{item}</span>)}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
