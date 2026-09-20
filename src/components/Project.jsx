import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import ImagePlaceholder from './ImagePlaceholder'
import Parallax from './motion/Parallax'
import { useReveal } from '../hooks/useReveal'

// Layout variants keep the portfolio from reading as a repeated card grid.
const LAYOUTS = {
  full: {
    wrapper: '',
    image: 'aspect-[16/9] md:aspect-[21/9] w-full',
    meta: 'mt-6 flex items-end justify-between',
  },
  'offset-right': {
    wrapper: 'md:flex md:items-end md:justify-end md:gap-10',
    image: 'aspect-[4/5] w-full md:w-[62%]',
    meta: 'mt-6 flex items-end justify-between md:w-[62%] md:ml-auto',
  },
  'offset-left': {
    wrapper: 'md:flex md:items-end md:gap-10',
    image: 'aspect-[4/5] w-full md:w-[62%]',
    meta: 'mt-6 flex items-end justify-between md:w-[62%]',
  },
}

export default function Project({ project }) {
  const [ref, visible] = useReveal()
  const layout = LAYOUTS[project.layout] ?? LAYOUTS.full

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

  return (
    <article
      ref={ref}
      className={`reveal group border-b border-line py-16 last:border-b-0 md:py-24 ${
        visible ? 'is-visible' : ''
      }`}
    >
      <div className={layout.wrapper}>
        <Link
          to={`/work/${project.slug}`}
          className={`relative block overflow-hidden md:cursor-none ${layout.image}`}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onMouseMove={handleMouseMove}
        >
          <Parallax amount={7} className="h-full w-full">
            <ImagePlaceholder
              src={project.image}
              alt={`${project.name} — ${project.category}`}
              label={project.name}
              className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
            />
          </Parallax>

          <motion.span
            className="pointer-events-none absolute z-10 hidden h-20 w-20 items-center justify-center rounded-full bg-paper text-[11px] uppercase tracking-widest2 text-ink md:flex"
            style={{ left: scx, top: scy, x: '-50%', y: '-50%' }}
            animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.5 }}
            transition={{ duration: 0.35, ease: [0.16, 0.8, 0.24, 1] }}
          >
            View
          </motion.span>
        </Link>

        <div className={layout.meta}>
          <div>
            <span className="block text-[12px] uppercase tracking-widest2 text-muted">
              {project.id} — {project.category}
            </span>
            <h3 className="mt-2 text-[7vw] font-medium leading-none tracking-tightest sm:text-[4vw] md:text-[2.6vw]">
              {project.name}
            </h3>
          </div>

          <Link
            to={`/work/${project.slug}`}
            className="hidden shrink-0 text-[12px] uppercase tracking-widest2 transition-opacity duration-300 group-hover:opacity-100 md:inline-block md:opacity-0"
          >
            View project →
          </Link>
        </div>
      </div>
    </article>
  )
}
