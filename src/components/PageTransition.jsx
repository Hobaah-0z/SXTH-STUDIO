import { motion } from 'framer-motion'

// Wraps each page's content. Combined with AnimatePresence in App.jsx,
// this gives a fast, deliberate clip-reveal between routes rather than a
// plain crossfade — kept quick so navigation never feels delayed.
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(0% 0 8% 0)', y: 16 }}
      animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)', y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: [0.16, 0.8, 0.24, 1] }}
    >
      {children}
    </motion.div>
  )
}
