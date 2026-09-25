import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import RevealLines from './motion/RevealLines'
import Magnetic from './motion/Magnetic'

export default function CTASection() {
  const [ref, visible] = useReveal()
  const mailRef = useRef(null)

  useEffect(() => {
    const mail = mailRef.current
    if (!mail) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    let frameId
    let lastTime = performance.now()
    let angle = 0
    let velocity = 0
    let pointerVelocity = 0
    let pointerX = 0
    let pointerActive = false

    const onPointerMove = (event) => {
      const rect = mail.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const clampedX = Math.max(0, Math.min(1, x))
      pointerX = (clampedX - 0.5) * 2
      pointerActive = true
      pointerVelocity += (event.movementX || 0) * 0.018
    }

    const onPointerLeave = () => {
      pointerActive = false
      pointerX = 0
    }

    mail.addEventListener('pointermove', onPointerMove)
    mail.addEventListener('pointerleave', onPointerLeave)

    const animate = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.032)
      lastTime = now
      const time = now / 1000

      const automaticTarget = Math.sin(time * 1.15) * 7
      const mouseTarget = pointerActive ? pointerX * 9 : 0
      const target = automaticTarget + mouseTarget

      pointerVelocity *= Math.pow(0.08, dt)
      velocity += pointerVelocity
      pointerVelocity = 0

      const spring = (target - angle) * 4.2
      const damping = velocity * 1.45
      velocity += (spring - damping) * dt
      angle += velocity * dt

      mail.style.transform = `rotate(${angle}deg)`
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      mail.removeEventListener('pointermove', onPointerMove)
      mail.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return (
    <section className="relative min-h-[720px] overflow-hidden border-t border-line bg-paper px-6 py-20 md:min-h-[calc(100svh-74px)] md:px-10 md:py-24">
      <div
        ref={ref}
        className={`reveal relative z-10 mx-auto flex h-full min-h-[620px] max-w-[1600px] flex-col justify-center ${visible ? 'is-visible' : ''}`}
      >
        <div className="max-w-[760px]">
          <RevealLines
            lines={['WHAT SHALL', 'WE MAKE?']}
            className="text-[12vw] font-medium leading-[0.9] tracking-tightest sm:text-[9vw] md:text-[7.5vw]"
          />

          <Magnetic strength={0.4} range={80} className="mt-12 md:mt-16">
            <a
              href="mailto:hello@sxth.studio"
              className="group inline-flex items-center gap-3 text-[14px] uppercase tracking-widest2 transition-colors duration-300 hover:text-accent"
            >
              <span className="border-b border-current pb-1">Start a project</span>
              <span aria-hidden="true">→</span>
            </a>
          </Magnetic>
        </div>

        <div
          aria-hidden="true"
          ref={mailRef}
          className="absolute -right-[2%] top-[-15%] hidden h-[115%] w-[48%] cursor-grab touch-none select-none md:block lg:-right-[1%] lg:w-[46%]"
          style={{ transformOrigin: '30.45% 0%', willChange: 'transform' }}
        >
          <img
            src="/images/mail.svg"
            alt=""
            className="h-full w-full object-contain object-center"
          />
        </div>
      </div>
    </section>
  )
}
