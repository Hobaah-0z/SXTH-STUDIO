import { useEffect, useRef, useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

// Plays `src` muted/looped while `playing` is true; falls back to the
// poster/placeholder image if the file is missing or fails to load.
export default function HoverVideo({ src, poster, playing, alt, label, className = '' }) {
  const videoRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el || failed) return
    if (playing) {
      el.currentTime = 0
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [playing, failed])

  if (failed || !src) {
    return <ImagePlaceholder src={poster} alt={alt} label={label} className={className} />
  }

  return (
    <video
      ref={videoRef}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      onError={() => setFailed(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}
