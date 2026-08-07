import { motion } from 'framer-motion'
import { Bell, CheckCircle2 } from 'lucide-react'

const cards = [
  { title: 'New Announcement', desc: 'Department meeting on May 18, 2:00 PM', delay: 0.2 },
  { title: 'Assignment Reminder', desc: 'ML Assignment due tomorrow', delay: 0.5 },
  { title: 'Attendance Update', desc: 'Marked present for today', delay: 0.8 },
]

const bullets = [
  'Instant Announcements',
  'Assignment Reminders',
  'Attendance Updates',
  'Admin Broadcasts',
]

export default function Notifications() {
  return (
    <section id="notifications" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative flex justify-center order-2 lg:order-1">
          <div className="relative w-64 aspect-[9/19] rounded-[2.5rem] bg-ink border-[6px] border-ink shadow-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-primary/5 to-white p-4 pt-10 relative">
              <p className="text-xs font-semibold text-ink/40 mb-3">Notifications</p>
              {cards.map((c) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: 120 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: c.delay }}
                  className="glass rounded-xl p-3 mb-3 shadow-glass"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Bell size={12} className="text-primary" />
                    <p className="text-[11px] font-semibold">{c.title}</p>
                  </div>
                  <p className="text-[10px] text-ink/50">{c.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-4 -left-6 w-16 h-16 rounded-full bg-grad-primary flex items-center justify-center text-white shadow-soft"
          >
            <Bell size={24} />
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Real-time Notifications</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
            Never miss <br /> what <span className="text-gradient">matters.</span>
          </h2>
          <p className="text-ink/60 text-lg mb-8 max-w-md leading-relaxed">
            Stay in the loop with instant alerts for announcements, tasks, attendance and more, delivered the moment they happen.
          </p>
          <div className="space-y-3">
            {bullets.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <CheckCircle2 size={18} className="text-primary shrink-0" />
                <span className="text-sm font-medium text-ink/70">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}