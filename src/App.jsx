import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TransitionProvider } from './context/TransitionContext'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Expertise from './components/Expertise'
import Ventures from './components/Ventures'
import CaseStudies from './components/CaseStudies'
import Testimonials from './components/Testimonials'
import Availability from './components/Availability'
import Connect from './components/Connect'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import CustomCursor from './components/CustomCursor'
import SectionDivider from './components/SectionDivider'
import WorkPage from './pages/WorkPage'

function HomePage() {
  return (
    <motion.div
      className="bg-brand-bg text-brand-fg min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <SectionDivider label="About" index={1} />
        <About />
        <SectionDivider label="Expertise" index={2} />
        <Expertise />
        <Marquee />
        <SectionDivider label="Ventures" index={3} />
        <Ventures />
        <SectionDivider label="Case Studies" index={4} />
        <CaseStudies />
        <SectionDivider label="Testimonials" index={5} />
        <Testimonials />
        <SectionDivider label="Availability" index={6} />
        <Availability />
        <SectionDivider label="Connect" index={7} />
        <Connect />
        <SectionDivider label="Contact" index={8} />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </motion.div>
  )
}

export default function App() {
  return (
    <TransitionProvider>
      <CustomCursor />
      <Routes>
        <Route path="/"     element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
      </Routes>
    </TransitionProvider>
  )
}
