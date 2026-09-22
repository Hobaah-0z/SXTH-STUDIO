import { useState } from 'react'

// Renders `src` if it loads; otherwise falls back to an obvious,
// easy-to-spot placeholder block so missing assets never look "finished".
export default function ImagePlaceholder({ src, alt, label, className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed || !src) {
    return (
      <div
        className={`placeholder-texture relative flex items-end justify-start bg-paper/40 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="m-4 inline-block bg-ink px-2 py-1 text-[11px] uppercase tracking-widest2 text-paper">
          Placeholder — {label}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
