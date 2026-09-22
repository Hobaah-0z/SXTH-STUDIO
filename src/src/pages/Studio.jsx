import StudioSection from '../components/StudioSection'
import MakersSection from '../components/MakersSection'
import PageTransition from '../components/PageTransition'

export default function Studio() {
  return (
    <PageTransition>
      <div className="pt-16 md:pt-20">
        <StudioSection />
        <MakersSection />
      </div>
    </PageTransition>
  )
}
