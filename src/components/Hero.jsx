import { useEffect, useRef } from 'react'
import HeroText from './HeroText'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const videoRef = useRef(null)

  useEffect(() => {
    if (reducedMotion && videoRef.current) {
      videoRef.current.pause()
    }
  }, [reducedMotion])

  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Environmental layer */}
      <div className="absolute inset-0">
        {reducedMotion ? (
          <img
            src="/images/sxth-creation-poster.jpg"
            alt="SXTH — creation, emergence, transformation"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/sxth-creation-poster.jpg"
            preload="metadata"
          >
            <source src="/videos/sxth-creation.mp4" type="video/mp4" />
          </video>
        )}
        {/* Fallback texture shown until real assets exist / if video fails */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-ink via-[#15150f] to-ink" />
        <div className="pointer-events-none absolute inset-0 bg-ink/25" />
      </div>

      {/* Content — nav occupies the top, so this layer only needs the lower row */}
      <div className="relative flex h-full w-full flex-col justify-end px-6 pb-10 md:px-10 md:pb-14">
        <div className="flex items-end justify-between gap-6">
          <span className="text-[12px] uppercase tracking-widest2 text-white/80">
            06 / CREATION
          </span>

          <HeroText reducedMotion={reducedMotion} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex">
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
        <span className="h-8 w-px animate-pulse bg-white/50" aria-hidden="true" />
      </div>
    </section>
  )
}
