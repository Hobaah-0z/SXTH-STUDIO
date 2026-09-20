import { services } from '../data/services'
import ServiceCategory from './ServiceCategory'

export default function ServicesSection() {
  return (
    <section id="services" className="bg-ink px-6 py-24 text-paper md:px-10 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <span className="mb-10 block text-[12px] uppercase tracking-widest2 text-accent-soft md:mb-16">
          Services
        </span>

        <div className="border-t border-line-inv">
          {services.map((service, i) => (
            <ServiceCategory key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
