import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <section className="flex min-h-[70vh] flex-col items-start justify-center px-6 md:px-10">
        <span className="mb-6 block text-[12px] uppercase tracking-widest2 text-muted">404</span>
        <h1 className="text-[12vw] font-medium leading-none tracking-tightest sm:text-[7vw]">
          Page not found.
        </h1>
        <Link
          to="/"
          className="mt-8 text-[13px] uppercase tracking-widest2 underline underline-offset-4"
        >
          Back to home →
        </Link>
      </section>
    </PageTransition>
  )
}
