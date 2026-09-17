import { useEffect, useState } from 'react'

const WORDS = ['brands', 'digital experiences', 'products', 'identities', 'campaigns', 'worlds']

export default function HeroText({ reducedMotion }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('enter') // 'enter' | 'exit'

  useEffect(() => {
    if (reducedMotion) return
    const holdTime = phase === 'enter' ? 2200 : 500
    const timer = setTimeout(() => {
      setPhase((p) => {
        if (p === 'enter') return 'exit'
        setIndex((i) => (i + 1) % WORDS.length)
        return 'enter'
      })
    }, holdTime)
    return () => clearTimeout(timer)
  }, [phase, reducedMotion])

  return (
    <div className="text-right text-white">
      <h1 className="text-[13vw] font-medium leading-[0.92] tracking-tightest sm:text-[9vw] md:text-[7vw] lg:text-[6vw]">
        LET US
        <br />
        MAKE.
      </h1>
      <div className="mt-4 h-[1.4em] overflow-hidden text-[4.2vw] leading-none tracking-tighter text-white/75 sm:text-[2.4vw] md:text-[1.4vw]">
        <span
          key={index}
          className={reducedMotion ? '' : phase === 'enter' ? 'word-enter inline-block' : 'word-exit inline-block'}
        >
          {WORDS[index]}
        </span>
      </div>
    </div>
  )
}
