import { useParams, Link, Navigate } from 'react-router-dom'
import { projects } from '../data/projects'
import ImagePlaceholder from '../components/ImagePlaceholder'
import PageTransition from '../components/PageTransition'

export default function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)

  if (index === -1) return <Navigate to="/work" replace />

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return (
    <PageTransition>
      <article>
        <header className="px-6 pb-10 pt-32 md:px-10 md:pt-40">
          <div className="mx-auto max-w-[1600px]">
            <Link
              to="/work"
              className="text-[12px] uppercase tracking-widest2 text-muted hover:text-ink"
            >
              ← Back to work
            </Link>

            <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h1 className="text-[10vw] font-medium leading-none tracking-tightest sm:text-[7vw] md:text-[5vw]">
                {project.name}
              </h1>
              <span className="text-[12px] uppercase tracking-widest2 text-muted">
                {project.id} — {project.category}
              </span>
            </div>
          </div>
        </header>

        <div className="px-6 md:px-10">
          <div className="mx-auto max-w-[1600px]">
            <ImagePlaceholder
              src={project.image}
              alt={project.name}
              label={project.name}
              className="aspect-[16/9] w-full object-cover md:aspect-[21/9]"
            />
          </div>
        </div>

        <div className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1600px]">
            <p className="max-w-xl text-[16px] leading-relaxed text-muted md:text-[18px]">
              {project.description}
            </p>
          </div>
        </div>

        <div className="border-t border-line px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between">
            <span className="text-[12px] uppercase tracking-widest2 text-muted">Next</span>
            <Link
              to={`/work/${next.slug}`}
              className="text-right text-[7vw] font-medium leading-none tracking-tightest transition-opacity hover:opacity-60 sm:text-[4vw] md:text-[2.6vw]"
            >
              {next.name} →
            </Link>
          </div>
        </div>
      </article>
    </PageTransition>
  )
}
