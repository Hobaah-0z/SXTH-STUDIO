import { useState } from 'react'
import { Link } from 'react-router-dom'
import HoverVideo from './HoverVideo'

// A single cell in the interlocking collage grid. The video plays inline
// on hover (not in a floating preview) since these cells are the visual
// focus of the layout, not a scannable list.
export default function WorkCollageItem({ project, className = '' }) {
  const [hovering, setHovering] = useState(false)

  return (
    <Link
      to={`/work/${project.slug}`}
      className={`group relative block overflow-hidden ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <HoverVideo
        src={project.video}
        poster={project.image}
        playing={hovering}
        alt={`${project.name} — ${project.category}`}
        label={project.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-6">
        <span className="block text-[11px] uppercase tracking-widest2 text-white/75">
          {project.id} — {project.category}
        </span>
        <h3 className="mt-1 text-[6vw] font-medium leading-none tracking-tightest sm:text-[2.6vw] md:text-[1.6vw]">
          {project.name}
        </h3>
      </div>
    </Link>
  )
}
