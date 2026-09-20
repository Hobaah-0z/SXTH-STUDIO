import { projects } from '../data/projects'
import WorkListItem from './WorkListItem'

// Used on the standalone /work page — a numbered, scannable index of every
// project, distinct from the image-led teaser shown on the homepage.
export default function WorkListSection() {
  return (
    <section className="bg-paper px-6 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-2 flex items-end justify-between">
          <h1 className="text-[9vw] font-medium leading-none tracking-tightest sm:text-[6vw] md:text-[4vw]">
            Work
          </h1>
          <span className="hidden text-[12px] uppercase tracking-widest2 text-muted md:block">
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>

        <div>
          {projects.map((project) => (
            <WorkListItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
