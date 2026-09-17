import { projects } from '../data/projects'
import Project from './Project'

export default function WorkSection() {
  return (
    <section id="work" className="bg-paper px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-4 flex items-end justify-between border-b border-line pb-8">
          <span className="text-[12px] uppercase tracking-widest2 text-muted">
            Selected Creations
          </span>
          <span className="hidden text-[12px] uppercase tracking-widest2 text-muted md:block">
            {String(projects.length).padStart(2, '0')} projects
          </span>
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
