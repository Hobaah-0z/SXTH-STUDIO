import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IntroSection from './components/IntroSection'
import WorkSection from './components/WorkSection'
import ServicesSection from './components/ServicesSection'
import StudioSection from './components/StudioSection'
import MakersSection from './components/MakersSection'
import CTASection from './components/CTASection'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to work
      </a>

      <Navbar />

      <main>
        <Hero />
        <IntroSection />
        <WorkSection />
        <ServicesSection />
        <StudioSection />
        <MakersSection />
        <CTASection />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
