import { motion } from 'framer-motion'
import { FileText, ListChecks, TrendingUp, BellRing, FolderOpen } from 'lucide-react'

const features = [
  { icon: FileText, title: 'Leave Management', desc: 'Apply for leave and track approval status easily.' },
  { icon: ListChecks, title: 'Task Manager', desc: 'Create, track and never miss an assignment again.' },
  { icon: TrendingUp, title: 'CGPA Calculator', desc: 'Calculate your CGPA instantly and track your progress.' },
  { icon: BellRing, title: 'Notifications', desc: 'Get instant updates on announcements, tasks and more.' },
  { icon: FolderOpen, title: 'Study Materials', desc: 'Access important materials anytime, anywhere, offline.' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
}

export default function Features() {
  return (
    <section id="features" className="section-pad relative bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Features</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl max-w-xl leading-tight">
            Everything you need <br /> in one <span className="text-gradient">smart app.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              className="card-3d glass rounded-3xl p-6 shadow-glass"
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                className="w-12 h-12 rounded-2xl bg-grad-primary flex items-center justify-center text-white mb-5"
              >
                <Icon size={22} />
              </motion.div>
              <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-ink/60 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}