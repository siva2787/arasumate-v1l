import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { Users, Megaphone } from 'lucide-react'

const items = [
  { icon: Users, title: 'Student Management', desc: 'View and manage registered student profiles.' },
  { icon: Megaphone, title: 'Send Announcements', desc: 'Broadcast updates to all students instantly.' },
]

const kpis = [
  { label: 'Total Users', value: 1234 },
  { label: 'Announcements Sent', value: 23 },
]

const bars = [45, 70, 55, 85, 65, 95, 75]

export default function AdminPanel() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section id="admin-panel" className="relative section-pad bg-gradient-to-b from-primary/5 to-white overflow-hidden">
      <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-primary/10 blur-3xl -translate-x-1/2" />
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Admin Panel</p>
          <h2 className="font-display font-bold text-[1.9rem] leading-tight sm:text-4xl md:text-5xl mb-6 leading-tight">
            Simple tools <br /> for <span className="text-gradient">admins.</span>
          </h2>
          <p className="text-ink/60 text-lg mb-10 max-w-md leading-relaxed">
            Admins can view registered students and send announcements straight to the app.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            {items.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="card-3d glass rounded-2xl p-5 shadow-glass"
              >
                <motion.span
                  whileHover={{ rotate: 10 }}
                  className="w-11 h-11 rounded-xl bg-grad-primary flex items-center justify-center text-white mb-4"
                >
                  <Icon size={20} />
                </motion.span>
                <p className="font-display font-semibold text-base mb-1.5">{title}</p>
                <p className="text-xs text-ink/50 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, rotateY: 15, x: 60 }}
          whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-grad-primary opacity-20 blur-2xl" />

          <div className="relative rounded-2xl border-8 border-ink bg-ink shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 bg-ink">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="font-display font-bold text-base">Admin Dashboard</p>
                <span className="w-8 h-8 rounded-full bg-grad-primary flex items-center justify-center text-white text-xs font-bold">A</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {kpis.map((k) => (
                  <div key={k.label} className="relative rounded-xl bg-primary/5 p-4 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-grad-primary" />
                    <p className="font-display font-bold text-2xl text-primary">
                      {inView && <CountUp end={k.value} duration={2} />}
                    </p>
                    <p className="text-xs text-ink/40 mt-1">{k.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-primary/5 p-4">
                <p className="text-xs font-semibold text-ink/60 mb-4">Monthly Overview</p>
                <div className="h-28 flex items-end gap-2">
                  {bars.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.6 }}
                      className="flex-1 bg-grad-primary rounded-t-md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-48 h-3 bg-ink/80 rounded-b-2xl mx-auto" />
          <div className="w-64 h-1.5 bg-ink/50 rounded-full mx-auto mt-0.5" />
        </motion.div>
      </div>
    </section>
  )
}