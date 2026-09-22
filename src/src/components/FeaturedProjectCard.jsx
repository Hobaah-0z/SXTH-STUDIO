import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import FeaturedProjectMedia from './FeaturedProjectMedia'

// Builds a strictly-increasing 3-point input range for useTransform, even
// when `t` sits right at 0 or 1 (where a naive [t - guard, t, t + guard]
// would collapse two points together and Framer would throw).
function activeRange(t, guard) {
  const points = [Math.max(0, t - guard), t, Math.min(1, t + guard)]
  for (let i = 1; i < points.length; i++) {
    if (points[i] <= points[i - 1]) points[i] = points[i - 1] + 0.0001
  }
  return points
}

// One project in the horizontal track. Position along the track is handled
// entirely by the parent (via CSS flex layout); this component only reacts
// to the shared drag/scroll progress to decide how "active" it currently is —
// and handles its own hover state for the video preview + cursor pill, which
// is a separate interaction layer from the drag itself.
export default function FeaturedProjectCard({
  project,
  cardRef,
  progress,
  centerT,
  guard,
  reducedMotion,
  dragging = false,
}) {
  const [hovering, setHovering] = useState(false)
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const scx = useSpring(cx, { stiffness: 300, damping: 30, mass: 0.5 })
  const scy = useSpring(cy, { stiffness: 300, damping: 30, mass: 0.5 })

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    cx.set(e.clientX - rect.left)
    cy.set(e.clientY - rect.top)
  }

  const inputRange = useMemo(() => activeRange(centerT, guard), [centerT, guard])

  // Restrained "this is the focus now" cues — never a dramatic carousel
  // effect, just a gentle lift as a project nears the centre of the
  // viewport and a gentle settle as it moves past.
  const scale = useTransform(progress, inputRange, reducedMotion ? [1, 1, 1] : [0.96, 1, 0.96])
  const mediaOpacity = useTransform(progress, inputRange, reducedMotion ? [1, 1, 1] : [0.7, 1, 0.7])
  const textY = useTransform(progress, inputRange, reducedMotion ? [0, 0, 0] : [14, 0, 14])
  const textOpacity = useTransform(progress, inputRange, reducedMotion ? [1, 1, 1] : [0.5, 1, 0.5])

  // The pill is a hover affordance; while the row is being dragged the grab
  // cursor is the more useful signal, so it steps aside.
  const showPill = hovering && !dragging

  return (
    <motion.article ref={cardRef} style={{ scale }} className="flex w-fit shrink-0 flex-col">
      <Link
        to={`/work/${project.slug}`}
        draggable={false}
        className="group relative block overflow-hidden [&_img]:pointer-events-none [&_img]:select-none"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          style={{ opacity: mediaOpacity }}
          className="aspect-[4/5] h-[52svh] sm:h-[60svh] md:h-[65svh] lg:h-[70svh]"
        >
          <FeaturedProjectMedia
            image={project.image}
            video={project.video}
            hovering={showPill}
            alt={`${project.name} — ${project.category}`}
            label={project.name}
            className="h-full w-full"
          />
        </motion.div>

        <motion.span
          className="pointer-events-none absolute z-10 hidden h-20 w-20 items-center justify-center rounded-full bg-paper text-[11px] uppercase tracking-widest2 text-ink md:flex"
          style={{ left: scx, top: scy, x: '-50%', y: '-50%' }}
          animate={{ opacity: showPill ? 1 : 0, scale: showPill ? 1 : 0.5 }}
          transition={{ duration: 0.35, ease: [0.16, 0.8, 0.24, 1] }}
        >
          View
        </motion.span>
      </Link>

      <motion.div style={{ y: textY, opacity: textOpacity }} className="mt-6 max-w-[30rem]">
        <span className="block text-[12px] uppercase tracking-widest2 text-muted">
          {project.id} — {project.category}
        </span>
        <h3 className="mt-2 text-[6vw] font-medium leading-none tracking-tightest sm:text-[3vw] md:text-[2vw]">
          {project.name}
        </h3>
      </motion.div>
    </motion.article>
  )
}
