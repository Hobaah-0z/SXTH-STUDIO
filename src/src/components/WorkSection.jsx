import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import { projects as allProjects } from '../data/projects'
import FeaturedProjectCard from './FeaturedProjectCard'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Drag-to-scroll horizontal track.
//
// The section is a normal block in the page flow now (no scroll-jacking, no
// sticky pin). The row is a natively scrollable overflow container, which
// gives touch devices real swipe + momentum for free, and trackpads their
// usual horizontal gesture. On top of that, mouse users get click-and-drag
// with a little inertia on release.
export default function WorkSection({
  projects = allProjects,
  eyebrow = 'Selected Creations',
  viewAllLink = false,
  standalone = false,
}) {
  const reducedMotion = useReducedMotion()

  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const [metrics, setMetrics] = useState({ maxScroll: 0, centers: [], viewportWidth: 0 })

  // 0 → 1 across the width of the track. Drives the same gentle "this one is
  // in focus" cues the vertical version used, just sourced from scrollLeft.
  const progress = useMotionValue(0)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const viewportWidth = track.clientWidth
    const maxScroll = Math.max(track.scrollWidth - viewportWidth, 0)
    const centers = cardRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 : 0))
    setMetrics({ maxScroll, centers, viewportWidth })
    progress.set(maxScroll > 0 ? track.scrollLeft / maxScroll : 0)
  }, [progress])

  useLayoutEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    // Re-measure once webfonts/images have had a chance to shift layout.
    const t = setTimeout(measure, 300)
    return () => {
      window.removeEventListener('resize', measure)
      clearTimeout(t)
    }
  }, [measure, projects])

  // --- Pointer drag (mouse only — touch keeps native scrolling) ---
  const drag = useRef({ active: false, startX: 0, startScroll: 0, lastX: 0, lastT: 0, v: 0, moved: false })
  const inertia = useRef(0)
  const [grabbing, setGrabbing] = useState(false)

  const stopInertia = () => {
    if (inertia.current) cancelAnimationFrame(inertia.current)
    inertia.current = 0
  }

  useEffect(() => stopInertia, [])

  function onPointerDown(e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    stopInertia()
    const track = trackRef.current
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
    }
    setGrabbing(true)
  }

  function onPointerMove(e) {
    const d = drag.current
    if (!d.active) return
    const track = trackRef.current
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 5) d.moved = true
    track.scrollLeft = d.startScroll - dx

    const now = performance.now()
    const dt = now - d.lastT
    if (dt > 0) d.v = (e.clientX - d.lastX) / dt
    d.lastX = e.clientX
    d.lastT = now
  }

  function endDrag() {
    const d = drag.current
    if (!d.active) return
    d.active = false
    setGrabbing(false)

    // Light momentum on release — decays quickly, never feels like a carousel.
    let v = d.v * 16
    if (Math.abs(v) < 1 || reducedMotion) return
    const step = () => {
      const track = trackRef.current
      if (!track) return
      track.scrollLeft -= v
      v *= 0.92
      if (Math.abs(v) > 0.4) inertia.current = requestAnimationFrame(step)
      else inertia.current = 0
    }
    inertia.current = requestAnimationFrame(step)
  }

  // A drag that moved shouldn't also fire the card's link.
  function onClickCapture(e) {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  function onScroll() {
    const track = trackRef.current
    if (!track) return
    const maxScroll = Math.max(track.scrollWidth - track.clientWidth, 0)
    progress.set(maxScroll > 0 ? track.scrollLeft / maxScroll : 0)
  }

  const slot =
    metrics.centers.length > 1
      ? Math.abs((metrics.centers[1] ?? 0) - (metrics.centers[0] ?? 0))
      : metrics.viewportWidth
  const guard = metrics.maxScroll > 0 ? Math.min(0.45, slot / 2 / metrics.maxScroll) : 0.5

  return (
    <section
      id="work"
      className={`bg-paper pb-20 md:pb-28 ${standalone ? 'pt-32 md:pt-40' : 'pt-24 md:pt-32'}`}
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <div className="flex items-end justify-between border-b border-line pb-6 md:pb-8">
          <span className="text-[12px] uppercase tracking-widest2 text-accent">{eyebrow}</span>
          {viewAllLink ? (
            <Link to="/work" className="text-[12px] uppercase tracking-widest2 text-muted hover:text-ink">
              View all work →
            </Link>
          ) : (
            <span className="hidden text-[12px] uppercase tracking-widest2 text-muted md:block">
              {String(projects.length).padStart(2, '0')} projects
            </span>
          )}
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className={`no-scrollbar mt-10 flex w-full gap-[5vw] overflow-x-auto overscroll-x-contain px-6 pb-2 md:mt-14 md:gap-[2.6vw] md:px-10 ${
          grabbing ? 'cursor-grabbing select-none' : 'md:cursor-grab'
        }`}
      >
        {projects.map((project, i) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            cardRef={(el) => (cardRefs.current[i] = el)}
            progress={progress}
            centerT={
              metrics.maxScroll > 0
                ? Math.min(
                    1,
                    Math.max(0, ((metrics.centers[i] ?? 0) - metrics.viewportWidth / 2) / metrics.maxScroll)
                  )
                : 0.5
            }
            guard={guard}
            reducedMotion={reducedMotion}
            dragging={grabbing}
          />
        ))}
      </div>

      <div className="mx-auto mt-8 w-full max-w-[1600px] px-6 md:mt-10 md:px-10">
        <div className="flex items-center gap-6">
          <span className="hidden shrink-0 text-[11px] uppercase tracking-widest2 text-muted md:block">
            Drag to explore
          </span>
          <div className="h-px w-full bg-line">
            <motion.div className="h-full origin-left bg-ink" style={{ scaleX: progress }} />
          </div>
        </div>
      </div>
    </section>
  )
}
