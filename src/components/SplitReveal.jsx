import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '../lib/gsap'

export default function SplitReveal({
  text,
  as: Tag = 'h2',
  className = '',
  style,
  delay = 0,
  stagger = 0.07,
  threshold = '85%',
}) {
  const ref = useRef(null)

  useGSAP(() => {
    const words = ref.current.querySelectorAll('.sr-word')
    gsap.from(words, {
      yPercent: 110,
      opacity: 0,
      duration: 0.75,
      stagger,
      ease: 'power4.out',
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: `top ${threshold}`,
      },
    })
  }, { scope: ref })

  return (
    <Tag ref={ref} className={className} style={style}>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em' }}
        >
          <span className="sr-word" style={{ display: 'inline-block' }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}
