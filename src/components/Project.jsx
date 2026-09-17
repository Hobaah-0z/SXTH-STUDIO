import ImagePlaceholder from './ImagePlaceholder'
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

  return (
    <article
      ref={ref}
      className={`reveal group border-b border-line py-16 last:border-b-0 md:py-24 ${
        visible ? 'is-visible' : ''
      }`}
    >
      <div className={layout.wrapper}>
        <a href={project.href} className={`block overflow-hidden ${layout.image}`}>
          <ImagePlaceholder
            src={project.image}
            alt={`${project.name} — ${project.category}`}
            label={project.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
          />
        </a>

        <div className={layout.meta}>
          <div>
            <span className="block text-[12px] uppercase tracking-widest2 text-muted">
              {project.id} — {project.category}
            </span>
            <h3 className="mt-2 text-[7vw] font-medium leading-none tracking-tightest sm:text-[4vw] md:text-[2.6vw]">
              {project.name}
            </h3>
          </div>

          <a
            href={project.href}
            className="hidden shrink-0 text-[12px] uppercase tracking-widest2 transition-opacity duration-300 group-hover:opacity-100 md:inline-block md:opacity-0"
          >
            View project →
          </a>
        </div>
      </div>
    </article>
  )
}
