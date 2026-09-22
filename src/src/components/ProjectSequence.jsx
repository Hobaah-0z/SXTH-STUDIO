import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import Parallax from './motion/Parallax'

export default function ProjectSequence({ projects }) {
  return (
    <section id="work" className="bg-paper px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex items-end justify-between border-b border-line pb-6 md:mb-24"><div><span className="block text-[12px] uppercase tracking-widest2 text-accent">Selected work</span><h2 className="mt-5 text-[16vw] font-medium leading-[0.78] tracking-tightest md:text-[10vw]">THE WORK</h2></div><Link to="/work" className="hidden text-[12px] uppercase tracking-widest2 text-muted transition-colors hover:text-white md:block">All work →</Link></div>
        <div className="space-y-28 md:space-y-48">{projects.map((project, i) => <ProjectStage key={project.id} project={project} index={i} total={projects.length} />)}</div>
        <div className="mt-20 border-t border-line pt-8 md:mt-28"><Link to="/work" className="text-[12px] uppercase tracking-widest2 text-muted hover:text-white md:hidden">View all work →</Link></div>
      </div>
    </section>
  )
}

function ProjectStage({ project, index, total }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'end 18%'] })
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], reduced ? [1,1,1] : [0.92,1,0.96])
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0,0] : [36,-24])
  const numberX = useTransform(scrollYProgress, [0,1], reduced ? [0,0] : [-20,30])
  return (
    <article ref={ref}>
      <div className={`mb-6 flex items-end justify-between md:mb-8 ${index % 2 ? 'md:flex-row-reverse' : ''}`}><motion.span style={{ x: numberX }} className="text-[11px] uppercase tracking-widest2 text-muted">{project.id} / {project.category}</motion.span><span className="text-[11px] uppercase tracking-widest2 text-muted">{String(index + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span></div>
      <Link to={`/work/${project.slug}`} className="group block">
        <motion.div style={{ scale, y }} className={`relative overflow-hidden bg-white/5 ${index % 2 ? 'md:ml-[12%]' : 'md:mr-[12%]'}`}>
          <div className="aspect-[16/10] md:aspect-[16/9]"><Parallax amount={7} className="h-full w-full"><img src={project.image} alt={`${project.name} — ${project.category}`} className="h-full w-full object-cover grayscale transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.04]" /></Parallax></div>
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" /><span className="absolute bottom-5 right-5 flex h-16 w-16 scale-75 items-center justify-center rounded-full bg-white text-[10px] uppercase tracking-widest2 text-black opacity-0 transition-all duration-500 ease-editorial group-hover:scale-100 group-hover:opacity-100 md:bottom-8 md:right-8 md:h-20 md:w-20">View</span>
        </motion.div>
        <div className={`mt-7 flex items-start justify-between gap-6 ${index % 2 ? 'md:ml-[12%]' : 'md:mr-[12%]'}`}><h3 className="text-[11vw] font-medium leading-[0.8] tracking-tightest transition-transform duration-700 ease-editorial group-hover:translate-x-2 md:text-[6.5vw]">{project.name}</h3><span className="hidden pt-1 text-[12px] uppercase tracking-widest2 text-muted md:block">Open case →</span></div>
      </Link>
    </article>
  )
}
