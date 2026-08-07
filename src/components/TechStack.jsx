import { motion } from 'framer-motion'
import { Atom, Server, Database, Cloud, Flame, Triangle } from 'lucide-react'

const stack = [
  { icon: Atom, name: 'React + Vite', sub: 'Frontend', color: '#61DAFB' },
  { icon: Server, name: 'Node.js + Express', sub: 'Backend', color: '#3C873A' },
  { icon: Database, name: 'MongoDB Atlas', sub: 'Database', color: '#47A248' },
  { icon: Cloud, name: 'Render', sub: 'Backend Hosting', color: '#6C4CFF' },
  { icon: Flame, name: 'Firebase', sub: 'Cloud Messaging', color: '#FFA000' },
  { icon: Triangle, name: 'Vercel', sub: 'Frontend Hosting', color: '#111111' },
]

export default function TechStack() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-14 text-center"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Technology Stack</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            Built with modern <span className="text-gradient">technologies.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stack.map(({ icon: Icon, name, sub, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="card-3d glass rounded-2xl p-5 flex flex-col items-center text-center shadow-glass"
            >
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} style={{ color }} className="mb-3">
                <Icon size={30} />
              </motion.div>
              <p className="text-xs font-semibold">{name}</p>
              <p className="text-[10px] text-ink/40">{sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
