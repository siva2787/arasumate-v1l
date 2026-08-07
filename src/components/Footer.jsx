import { motion } from 'framer-motion'
import { Instagram, Linkedin, Github, Phone, ArrowUp } from 'lucide-react'
import logo from '../assets/logo.png'

const cols = [
  { title: 'Quick Links', items: ['Home', 'Features', 'About', 'How it Works', 'FAQ', 'Contact'] },
  { title: 'Resources', items: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Support'] },
]

const socials = [
  { icon: Instagram, href: 'https://instagram.com/s1v4_._28' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/siva2787/' },
  { icon: Github, href: 'https://github.com/siva2787' },
  { icon: Phone, href: 'tel:+918489590056' },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white pt-20 pb-8 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.3fr_1fr_1fr] gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 font-display font-bold text-xl mb-4">
            <img src={logo} alt="ARASUMATE" className="w-9 h-9 rounded-xl" />
            ARASUMATE
          </div>
          <p className="text-white/50 text-sm max-w-xs leading-relaxed mb-5">
            Smart Academics, Smarter You. An all-in-one academic companion for students.
          </p>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith('tel:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-display font-semibold mb-4 text-sm">{c.title}</p>
            <ul className="space-y-2.5 text-sm text-white/50">
              {c.items.map((i) => (
                <li key={i} className="hover:text-primary transition-colors cursor-pointer">{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>© 2026 ARASUMATE. All rights reserved.</p>
        <motion.button
          whileHover={{ y: -3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-10 h-10 rounded-full bg-grad-primary flex items-center justify-center text-white"
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  )
}