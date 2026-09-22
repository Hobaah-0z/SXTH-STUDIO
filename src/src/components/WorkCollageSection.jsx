import { projects } from '../data/projects'
import WorkCollageItem from './WorkCollageItem'

// Cycles a 4-cell interlocking pattern — one large block, two medium
// blocks, one full-width band — so the collage keeps working cleanly as
// more projects are added (grouped in fours).
const PATTERN = [
  'col-span-4 row-span-2 md:col-span-2 md:row-span-2',
  'col-span-4 row-span-1 md:col-span-2 md:row-span-1',
  'col-span-4 row-span-1 md:col-span-2 md:row-span-1',
  'col-span-4 row-span-1 md:col-span-4 md:row-span-1',
]

export default function WorkCollageSection() {
  return (
    <section className="flex flex-col bg-paper px-6 pb-6 pt-28 md:h-[200svh] md:px-10 md:pb-8 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        <div className="mb-6 flex items-end justify-between md:mb-8">
          <h1 className="text-[9vw] font-medium leading-none tracking-tightest sm:text-[6vw] md:text-[4vw]">
            Work
          </h1>
          <span className="hidden text-[12px] uppercase tracking-widest2 text-muted md:block">
            {String(projects.length).padStart(2, '0')} projects
          </span>
        </div>

        <div className="grid flex-1 grid-cols-4 gap-3 [grid-auto-rows:minmax(260px,1fr)] md:grid-rows-3 md:gap-4">
          {projects.map((project, i) => (
            <WorkCollageItem
              key={project.id}
              project={project}
              className={PATTERN[i % PATTERN.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
