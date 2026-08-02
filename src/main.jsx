import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import Preloader from './components/Preloader.jsx'
import Lenis from 'lenis'
import { gsap } from './lib/gsap'
import { ScrollTrigger } from './lib/gsap'

function Root() {
  const [ready, setReady] = useState(false)

  // Start Lenis only after preloader is done
  useEffect(() => {
    if (!ready) return
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => { lenis.raf(time * 1000) })
    gsap.ticker.lagSmoothing(0)
    return () => { lenis.destroy() }
  }, [ready])

  // Lock scroll while preloader is active
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [ready])

  return (
    <>
      {/* AnimatePresence here so removing Preloader triggers its exit animation */}
      <AnimatePresence>
        {!ready && (
          <Preloader key="preloader" onComplete={() => setReady(true)} />
        )}
      </AnimatePresence>

      {/* App renders after preloader signals completion */}
      {ready && <App />}
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
)
