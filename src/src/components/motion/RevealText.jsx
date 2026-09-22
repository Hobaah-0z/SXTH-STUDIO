import { motion } from 'framer-motion'

const container = {
  hidden: {},
  visible: (stagger) => ({
    transition: { staggerChildren: stagger },
  }),
}

const word = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.16, 0.8, 0.24, 1] },
  },
}

// Splits `text` into words and reveals them one by one, either as soon as
// it mounts (triggerOnMount — for hero content) or when scrolled into view.
//
// When `weightFrom`/`weightTo` are both given, each word also gets its own
// `wght` axis hover transition: it sits at `weightFrom` at rest and eases to
// `weightTo` under the cursor, independently per word (only the word being
// hovered thickens). This is driven by plain CSS `:hover` (see the
// `.wght-hover` rule in index.css) rather than Framer Motion — Framer's
// generic value interpolation doesn't reliably animate uncommon CSS
// properties like font-variation-settings, where native `:hover` is
// guaranteed to work in every browser.
export default function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  stagger = 0.06,
  once = true,
  delay = 0,
  triggerOnMount = false,
  weightFrom,
  weightTo,
}) {
  const words = text.split(' ')
  const hoverable = weightFrom != null && weightTo != null

  const viewportProps = triggerOnMount
    ? { animate: 'visible', initial: 'hidden' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once, amount: 0.4 } }

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={container}
        custom={stagger}
        transition={{ delayChildren: delay }}
        {...viewportProps}
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
            <motion.span
              className={`inline-block ${hoverable ? 'wght-hover' : ''}`}
              variants={word}
              style={
                hoverable
                  ? { '--wght-from': weightFrom, '--wght-to': weightTo }
                  : undefined
              }
            >
              {w}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
