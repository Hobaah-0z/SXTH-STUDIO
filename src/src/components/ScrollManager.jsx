import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to top on every route change, or smoothly to an in-page anchor
// (e.g. navigating to /#services from another page) when a hash is present.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const timer = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])

  return null
}
