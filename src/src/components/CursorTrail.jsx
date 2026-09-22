import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { TRAIL_COLORS, hexToRgb, sampleRamp } from '../lib/trailPalette'

// A smooth, colour-graded ribbon that follows the cursor.
//
// The site's palette is deliberately monochrome, so this is the one place
// colour appears — which means it has to behave: it's a single continuous
// stroke (not a particle spray), it tapers to nothing at the tail, and it
// fades out entirely when the pointer stops. Drawn on a canvas with
// `screen` blending so it reads as light on the near-black paper.
//
// Two things keep it feeling "smooth" rather than jittery:
//   1. The head chases the raw pointer position with a spring (critically
//      damped-ish), so fast flicks arc instead of snapping.
//   2. Segments are drawn as quadratic curves through the midpoints of the
//      sampled points, which rounds off the polyline entirely.
//
// The same ramp (src/lib/trailPalette.js) tints the liquid-distortion
// imagery in FeaturedProjectMedia, so the two effects read as one system.

export default function CursorTrail({
  colors = TRAIL_COLORS,
  width = 14,        // stroke width at the head, in px
  length = 26,       // how many points the ribbon holds — longer = more lag
  speed = 0.22,      // how hard the head chases the pointer (0 → 1)
  cycle = 0.00006,   // how fast the palette drifts over time
  glow = true,
}) {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    // No trail for reduced-motion users, and none on touch — there's no
    // persistent pointer to trail behind.
    if (reducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rgbStops = colors.map(hexToRgb)

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

    // Raw pointer target, the spring-smoothed head, and the trail history.
    const target = { x: -9999, y: -9999 }
    const head = { x: -9999, y: -9999 }
    let seeded = false
    let points = []
    let alive = 0 // 0 → 1 master opacity, eases out when the pointer rests
    let idleFrames = 0
    let raf = 0

    function onMove(e) {
      target.x = e.clientX
      target.y = e.clientY
      if (!seeded) {
        head.x = target.x
        head.y = target.y
        seeded = true
      }
      idleFrames = 0
    }
    function onLeave() {
      idleFrames = 999
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    function frame(now) {
      raf = requestAnimationFrame(frame)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!seeded) return

      head.x += (target.x - head.x) * speed
      head.y += (target.y - head.y) * speed

      points.push({ x: head.x, y: head.y })
      while (points.length > length) points.shift()

      // The ribbon breathes in when the pointer moves and out when it rests,
      // so a parked cursor doesn't leave a permanent smear on the page.
      const moving = Math.hypot(target.x - head.x, target.y - head.y) > 0.4
      idleFrames = moving ? 0 : idleFrames + 1
      const wantAlive = idleFrames > 8 ? 0 : 1
      alive += (wantAlive - alive) * 0.08
      if (alive < 0.01) return

      ctx.globalCompositeOperation = 'screen'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Wide soft pass first, then a tighter bright pass on top — cheaper
      // and steadier than a canvas blur filter.
      const passes = glow ? [{ w: 2.6, a: 0.16 }, { w: 1, a: 0.85 }] : [{ w: 1, a: 0.9 }]

      for (const pass of passes) {
        for (let i = 1; i < points.length - 1; i++) {
          const p = points[i]
          const prev = points[i - 1]
          const next = points[i + 1]

          // t: 0 at the tail, 1 at the head.
          const t = i / (points.length - 1)
          const [r, g, b] = sampleRamp(rgbStops, t * 0.85 + now * cycle)

          ctx.beginPath()
          ctx.moveTo((prev.x + p.x) / 2, (prev.y + p.y) / 2)
          ctx.quadraticCurveTo(p.x, p.y, (p.x + next.x) / 2, (p.y + next.y) / 2)
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${t * t * pass.a * alive})`
          ctx.lineWidth = Math.max(0.5, width * t * pass.w)
          ctx.stroke()
        }
      }

      // A small bright dot riding the very front of the ribbon.
      const [hr, hg, hb] = sampleRamp(rgbStops, 0.85 + now * cycle)
      ctx.beginPath()
      ctx.arc(head.x, head.y, width * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${hr}, ${hg}, ${hb}, ${0.9 * alive})`
      ctx.fill()
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
    // `colors` is joined so an inline array literal doesn't restart the loop
    // on every parent render.
  }, [colors.join(','), width, length, speed, cycle, glow, reducedMotion]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
    />
  )
}
