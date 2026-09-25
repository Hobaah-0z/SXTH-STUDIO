import { useEffect, useRef, useState } from 'react'
import LiquidImage from './LiquidImage'

// Project media is intentionally image-first: colour artwork stays visible,
// then the short project film takes over when the project enters the viewport.
// The video pauses and resets when it leaves the viewport so several projects
// never compete for playback at the same time.
export default function FeaturedProjectMedia({
  image,
  video,
  hovering = false,
  playOnView = false,
  alt,
  label,
  className = '',
}) {
  const rootRef = useRef(null)
  const videoRef = useRef(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [inView, setInView] = useState(false)
  const canPlayVideo = Boolean(video) && !videoFailed
  const shouldPlay = canPlayVideo && (playOnView ? inView : hovering)

  useEffect(() => {
    if (!playOnView || !rootRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 0.7] }
    )

    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [playOnView])

  useEffect(() => {
    const el = videoRef.current
    if (!el || !canPlayVideo) return

    if (shouldPlay) {
      const playPromise = el.play()
      if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {})
    } else {
      el.pause()
      el.currentTime = 0
    }
  }, [shouldPlay, canPlayVideo])

  return (
    <div ref={rootRef} className={`relative overflow-hidden ${className}`}>
      <LiquidImage
        src={image}
        alt={alt}
        label={label}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-editorial ${
          canPlayVideo && shouldPlay ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {canPlayVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={image}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-editorial ${
            shouldPlay ? 'scale-100 opacity-100' : 'scale-[1.02] opacity-0'
          }`}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
