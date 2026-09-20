import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import HoverVideo from './HoverVideo'

// A numbered, scannable row for the full Work index — name + category on
// the left, a small always-visible thumbnail on the right, and (desktop
// only) a larger preview that follows the cursor while hovering the row.
export default function WorkListItem({ project }) {
  const [hovering, setHovering] = useState(false)
  const cx = useMotionValue(0)
  const cy = useMotionValue(0)
  const scx = useSpring(cx, { stiffness: 240, damping: 26, mass: 0.6 })
  const scy = useSpring(cy, { stiffness: 240, damping: 26, mass: 0.6 })

  function handleMove(e) {
    cx.set(e.clientX)
    cy.set(e.clientY)
  }

  return (
    <Link
      to={`/work/${project.slug}`}
      className="group relative flex items-center justify-between gap-6 border-t border-line py-8 last:border-b md:py-10"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={handleMove}
    >
      <div className="flex items-baseline gap-6 md:gap-10">
        <span className="text-[12px] uppercase tracking-widest2 text-accent">{project.id}</span>
        <h3 className="text-[7vw] font-medium leading-none tracking-tightest transition-transform duration-500 ease-editorial group-hover:translate-x-2 sm:text-[4vw] md:text-[2.6vw]">
          {project.name}
        </h3>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <span className="hidden text-[12px] uppercase tracking-widest2 text-muted md:block">
          {project.category}
        </span>
        <ImagePlaceholder
          src={project.image}
          alt={project.name}
          label={project.name}
          className="h-14 w-20 shrink-0 object-cover md:h-16 md:w-24"
        />
      </div>

      <motion.div
        className="pointer-events-none fixed z-30 hidden h-[220px] w-[320px] overflow-hidden md:block"
        style={{ left: scx, top: scy, x: '-50%', y: '-120%' }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.92 }}
        transition={{ duration: 0.3, ease: [0.16, 0.8, 0.24, 1] }}
      >
        <HoverVideo
          src={project.video}
          poster={project.image}
          playing={hovering}
          alt=""
          label={project.name}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </Link>
  )
}
