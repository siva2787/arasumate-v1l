import ScrollProgress from '../components/ScrollProgress'
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About'
import HowItWorks from '../components/HowItWorks'
import Notifications from '../components/Notifications'
import AdminPanel from '../components/AdminPanel'
import TechStack from '../components/TechStack'
import Screenshots from '../components/Screenshots'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import DownloadCTA from '../components/DownloadCTA'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Navbar />
      <SideNav />
      <main>
        <Hero />
        <Features />
        <About />
        <HowItWorks />
        <Notifications />
        <AdminPanel />
        <TechStack />
        <Screenshots />
        <Testimonials />
        <FAQ />
        <Contact />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  )
}
