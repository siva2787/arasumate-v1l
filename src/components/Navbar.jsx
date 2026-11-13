import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logo from '../assets/logo.png'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'about', label: 'About' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'screenshots', label: 'Screenshots' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || open ? 'glass shadow-glass py-3' : 'py-4 sm:py-6 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-2 font-display font-bold text-lg sm:text-xl">
          <img src={logo} alt="KAMPLY" className="w-9 h-9 rounded-xl" />
          KAMPLY
        </button>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-ink/70">
          {links.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-primary transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <button className="lg:hidden p-2 -mr-2" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="lg:hidden glass mt-3 mx-4 rounded-2xl overflow-y-auto max-h-[75vh]"
        >
          <div className="flex flex-col p-4 gap-1">
            {links.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left px-3 py-3 rounded-xl hover:bg-primary/10 font-medium">
                {l.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}