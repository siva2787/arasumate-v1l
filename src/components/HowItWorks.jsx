import { motion } from 'framer-motion'
import { Download, Settings, Compass, Trophy } from 'lucide-react'
import FloatingShapes from './FloatingShapes'

const steps = [
  { icon: Download, title: 'Download APK', desc: 'Download ARASUMATE APK from our website.' },
  { icon: Settings, title: 'Install & Setup', desc: 'Install the APK and create your account.' },
  { icon: Compass, title: 'Explore & Use', desc: 'Explore features and organize your academic life.' },
  { icon: Trophy, title: 'Achieve More', desc: 'Stay organized, get notified and achieve your goals.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative section-pad bg-ink text-white overflow-hidden">
      <FloatingShapes variant="dark" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">How It Works</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Simple steps, <span className="text-gradient">powerful impact.</span>
          </h2>
        </motion.div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <motion.span
                whileInView={{ boxShadow: ['0 0 0px rgba(184,168,255,0)', '0 0 30px rgba(184,168,255,0.6)', '0 0 10px rgba(184,168,255,0.3)'] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.15 }}
                className="w-16 h-16 rounded-full bg-grad-primary flex items-center justify-center mb-5 relative z-10"
              >
                <Icon size={26} />
              </motion.span>
              <p className="text-xs text-accent font-semibold mb-1">Step {i + 1}</p>
              <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-white/50 max-w-[200px]">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
