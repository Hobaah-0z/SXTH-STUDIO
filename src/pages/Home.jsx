import Hero from '../components/Hero'
import SplitIntro from '../components/SplitIntro'
import ApproachSection from '../components/ApproachSection'
import StatementBand from '../components/StatementBand'
import ServicesTeaserBand from '../components/ServicesTeaserBand'
import AudienceSection from '../components/AudienceSection'
import NewsletterCTA from '../components/NewsletterCTA'
import WorkSection from '../components/WorkSection'
import ServicesSection from '../components/ServicesSection'
import CTASection from '../components/CTASection'
import PageTransition from '../components/PageTransition'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <SplitIntro />
      <ApproachSection />
      <StatementBand />
      <ServicesTeaserBand />
      <AudienceSection />
      <NewsletterCTA />
      <WorkSection projects={projects.slice(0, 2)} viewAllLink />
      <ServicesSection />
      <CTASection />
    </PageTransition>
  )
}
