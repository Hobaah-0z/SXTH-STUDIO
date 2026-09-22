import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

export default function MobileMenu({ open, onClose, links }) {
  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .45, ease: [0.16,.8,.24,1] }} className="fixed inset-0 z-50 bg-paper text-ink md:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
          <motion.div initial={{ y: -15 }} animate={{ y: 0 }} exit={{ y: -15 }} className="flex items-center justify-between px-6 py-5"><Logo variant="light" className="h-6 w-auto" /><button type="button" onClick={onClose} className="text-[12px] uppercase tracking-widest2">Close</button></motion.div>
          <nav className="flex h-[calc(100%-88px)] flex-col justify-center gap-2 px-6">
            {links.map((link, i) => (
              <motion.div key={link.label} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ delay: i * .06, duration: .55, ease: [0.16,.8,.24,1] }}>
                <Link to={link.to} onClick={onClose} className="block border-t border-line py-5 text-[13vw] font-medium leading-none tracking-tightest transition-colors hover:text-accent first:border-t-0">{link.label}</Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
