import { useEffect, useRef, useState } from 'react'

// Attach to a ref; returns true once the element has entered the viewport.
// Respects reduced-motion by simply not needing to (CSS handles the opt-out).
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, ...options }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}
