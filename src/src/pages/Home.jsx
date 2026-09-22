import Hero from '../components/Hero'
import StatementMarquee from '../components/StatementMarquee'
import IntroSection from '../components/IntroSection'
import ProjectSequence from '../components/ProjectSequence'
import ScrollWordField from '../components/motion/ScrollWordField'
import OwnittStyleServices from '../components/OwnittStyleServices'
import CTASection from '../components/CTASection'
import WhyUsSection from '../components/WhyUsSection'
import PageTransition from '../components/PageTransition'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <StatementMarquee />
      <IntroSection />
      <ScrollWordField words={['CREATE', 'BUILD', 'MOVE', 'IMAGINE']} />
      <ProjectSequence projects={projects} />
      <OwnittStyleServices />
      <CTASection />
      <WhyUsSection />
    </PageTransition>
  )
}
