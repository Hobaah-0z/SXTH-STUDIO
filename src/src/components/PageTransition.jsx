import { motion } from 'framer-motion'

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, clipPath: 'inset(0 0 8% 0)' }}
      animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0, y: -20, clipPath: 'inset(0 0 8% 0)' }}
      transition={{ duration: 0.7, ease: [0.16, 0.8, 0.24, 1] }}
    >{children}</motion.div>
  )
}
