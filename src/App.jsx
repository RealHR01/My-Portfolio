import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import TrustedBy from './components/TrustedBy'
import About from './components/About'
import Expertise from './components/Expertise'
import Ventures from './components/Ventures'
import Testimonials from './components/Testimonials'
import Availability from './components/Availability'
import Connect from './components/Connect'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <div className="bg-brand-bg text-brand-fg min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <TrustedBy />
        <About />
        <Expertise />
        <Marquee />
        <Ventures />
        <Testimonials />
        <Availability />
        <Connect />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
