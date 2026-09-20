import { Link } from 'react-router-dom'
import { projects as allProjects } from '../data/projects'
import Project from './Project'

export default function WorkSection({
  projects = allProjects,
  eyebrow = 'Selected Creations',
  viewAllLink = false,
  standalone = false,
}) {
  return (
    <section
      id="work"
      className={`bg-paper px-6 pb-24 md:px-10 md:pb-32 ${
        standalone ? 'pt-32 md:pt-40' : 'py-24 md:py-32'
      }`}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-4 flex items-end justify-between border-b border-line pb-8">
          <span className="text-[12px] uppercase tracking-widest2 text-accent">{eyebrow}</span>
          {viewAllLink ? (
            <Link
              to="/work"
              className="text-[12px] uppercase tracking-widest2 text-muted hover:text-ink"
            >
              View all work →
            </Link>
          ) : (
            <span className="hidden text-[12px] uppercase tracking-widest2 text-muted md:block">
              {String(projects.length).padStart(2, '0')} projects
            </span>
          )}
        </div>

        <div>
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
