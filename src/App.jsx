import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Expertise from './components/Expertise'
import Ventures from './components/Ventures'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-brand-bg text-brand-fg min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Marquee />
        <Ventures />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
