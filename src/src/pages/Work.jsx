import { projects } from '../data/projects'
import ProjectSequence from '../components/ProjectSequence'
import PageTransition from '../components/PageTransition'

export default function Work() {
  return <PageTransition><ProjectSequence projects={projects} /></PageTransition>
}
