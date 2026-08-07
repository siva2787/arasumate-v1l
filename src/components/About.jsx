import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Users, Building2, Activity, Lock } from 'lucide-react'
import aboutIllustration from '../assets/about-illustration.jpg'

const stats = [
  { icon: Users, value: 10, suffix: 'K+', label: 'Users' },
  { icon: Building2, value: 50, suffix: '+', label: 'Institutions' },
  { icon: Activity, value: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  { icon: Lock, value: 100, suffix: '%', label: 'Privacy' },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section id="about" className="section-pad bg-gradient-to-b from-white to-primary/5">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative flex justify-center"
        >
          <div className="absolute w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
          <motion.img
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
            src={aboutIllustration}
            alt="Students using ARASUMATE"
            className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl"
          />
        </motion.div>

        <div ref={ref}>
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">About Us</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
            Built for students, <br /> by <span className="text-gradient">students.</span>
          </h2>
          <p className="text-ink/60 text-lg mb-10 max-w-lg leading-relaxed">
            ARASUMATE was created with a simple mission: to make academic life easier and smarter for every student. We understand the challenges students face, and we're here to solve them with technology.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {stats.map(({ icon: Icon, value, suffix, label, decimals }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Icon size={20} />
                </span>
                <div>
                  <p className="font-display font-bold text-2xl">
                    {inView && <CountUp end={value} decimals={decimals || 0} duration={2} />}
                    {suffix}
                  </p>
                  <p className="text-xs text-ink/50">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}