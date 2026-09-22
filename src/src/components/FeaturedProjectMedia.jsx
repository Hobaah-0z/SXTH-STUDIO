import { useEffect, useRef, useState } from 'react'
import LiquidImage from './LiquidImage'

// Static image and preview video are layered on top of each other and
// cross-faded, rather than one replacing the other outright. The video
// only ever plays while `hovering` is true; if there's no video path, or
// the file fails to load, it never mounts and the image just stays put —
// nothing about the card breaks.
export default function FeaturedProjectMedia({
  image,
  video,
  hovering,
  alt,
  label,
  className = '',
}) {
  const videoRef = useRef(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const canPlayVideo = Boolean(video) && !videoFailed

  useEffect(() => {
    const el = videoRef.current
    if (!el || !canPlayVideo) return

    if (hovering) {
      const playPromise = el.play()
      // Autoplay can be rejected by the browser — that's fine, the poster
      // frame / underlying image is still there either way.
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {})
      }
    } else {
      el.pause()
      el.currentTime = 0
    }
  }, [hovering, canPlayVideo])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <LiquidImage
        src={image}
        alt={alt}
        label={label}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-editorial ${
          canPlayVideo && hovering ? 'opacity-0' : 'opacity-100'
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
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-500 ease-editorial ${
            hovering ? 'scale-[1.02] opacity-100' : 'scale-100 opacity-0'
          }`}
        >
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
