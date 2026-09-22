import RevealText from './RevealText'

// For headings that span multiple manual lines (e.g. "LET US" / "MAKE.").
// Each line staggers in slightly after the previous one.
export default function RevealLines({
  lines,
  as: Tag = 'div',
  className = '',
  lineClassName = 'block',
  stagger = 0.06,
  lineDelay = 0.08,
  once = true,
  triggerOnMount = false,
  weightFrom,
  weightTo,
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <RevealText
          key={line + i}
          as="span"
          text={line}
          className={lineClassName}
          stagger={stagger}
          once={once}
          delay={i * lineDelay}
          triggerOnMount={triggerOnMount}
          weightFrom={weightFrom}
          weightTo={weightTo}
        />
      ))}
    </Tag>
  )
}
