import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import CursorTrail from './components/CursorTrail'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectDetail from './pages/ProjectDetail'
import Studio from './pages/Studio'
import ContactPage from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to work
      </a>

      <ScrollProgress />
      <CursorTrail />
      <Navbar />
      <ScrollManager />

      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  )
}
