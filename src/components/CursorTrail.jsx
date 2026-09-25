import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Monochrome "fire" cursor trail.
// The reference effect is a soft chain of round, tapered particles that
// follows behind the real cursor. `difference` makes the particles invert
// whatever surface they pass over: black on white, white on black, etc.

export default function CursorTrail({
  width = 14,
  length = 5,
  speed = 0.26,
  glow = false,
}) {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let dpr = 1

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const target = { x: -9999, y: -9999 }
    const particles = Array.from({ length }, () => ({
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
    }))

    let seeded = false
    let idle = 1
    let raf = 0
    let lastTime = performance.now()

    function onMove(e) {
      target.x = e.clientX
      target.y = e.clientY
      idle = 0

      if (!seeded) {
        for (const particle of particles) {
          particle.x = target.x
          particle.y = target.y
        }
        seeded = true
      }
    }

    function onLeave() {
      idle = 1
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    function drawParticle(x, y, radius, angle, stretch, alpha) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      ctx.beginPath()
      ctx.ellipse(
        0,
        0,
        radius * (1 + stretch),
        radius * (1 - stretch * 0.45),
        0,
        0,
        Math.PI * 2,
      )
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.fill()
      ctx.restore()
    }

    function frame(now) {
      raf = requestAnimationFrame(frame)

      const dt = Math.min(40, now - lastTime)
      lastTime = now
      const frameScale = dt / 16.6667

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      if (!seeded) return

      const lead = particles[0]
      const leadDx = target.x - lead.x
      const leadDy = target.y - lead.y
      lead.vx += leadDx * speed * 0.42 * frameScale
      lead.vy += leadDy * speed * 0.42 * frameScale
      lead.vx *= Math.pow(0.62, frameScale)
      lead.vy *= Math.pow(0.62, frameScale)
      lead.x += lead.vx * frameScale
      lead.y += lead.vy * frameScale

      for (let i = 1; i < particles.length; i += 1) {
        const particle = particles[i]
        const previous = particles[i - 1]
        const follow = 0.24 + (i / particles.length) * 0.07
        particle.vx += (previous.x - particle.x) * follow * frameScale
        particle.vy += (previous.y - particle.y) * follow * frameScale
        particle.vx *= Math.pow(0.52, frameScale)
        particle.vy *= Math.pow(0.52, frameScale)
        particle.x += particle.vx * frameScale
        particle.y += particle.vy * frameScale
      }

      const leadSpeed = Math.hypot(lead.vx, lead.vy)
      idle += leadSpeed < 0.08 ? dt : -dt * 2.5
      idle = Math.max(0, Math.min(1000, idle))
      const fade = Math.max(0, 1 - Math.max(0, idle - 220) / 300)
      if (fade <= 0) return

      // White + difference = automatic inversion.
      ctx.globalCompositeOperation = 'difference'

      if (glow && leadSpeed > 1.5) {
        const tail = particles[particles.length - 1]
        drawParticle(
          tail.x,
          tail.y,
          Math.max(0.5, width * 0.07),
          Math.atan2(tail.vy, tail.vx),
          0,
          0.45 * fade,
        )
      }

      // Largest particle at the leading end, tapering to pin-sized particles.
      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i]
        const t = 1 - i / Math.max(1, particles.length - 1)
        const eased = t * t * (3 - 2 * t)
        const radius = Math.max(0.65, width * (0.075 + 0.925 * eased))
        const velocity = Math.hypot(particle.vx, particle.vy)
        const angle = Math.atan2(particle.vy, particle.vx)
        const stretch = Math.min(0.34, velocity / 34) * (0.35 + eased * 0.65)

        drawParticle(
          particle.x,
          particle.y,
          radius,
          angle,
          stretch,
          fade * (0.45 + eased * 0.55),
        )
      }

      ctx.globalCompositeOperation = 'source-over'
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [width, length, speed, glow, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    />
  )
}
