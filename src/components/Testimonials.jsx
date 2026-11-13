import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  { name: 'Karthik S', role: '3rd Year, AI & DS', quote: 'KAMPLY has made my academic life so organized and stress-free!' },
  { name: 'Meena R', role: '3rd Year, AI & DS', quote: 'Love the notifications and CGPA tracker. Super helpful!' },
  { name: 'Arun K', role: '3rd Year, AI & DS', quote: 'Best app for our department. Everything in one place!' },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-14 text-center"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">What Students Say</p>
          <h2 className="font-display font-bold text-[1.9rem] leading-tight sm:text-4xl md:text-5xl">Loved by <span className="text-gradient">students.</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="glass rounded-3xl p-7 shadow-glass"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={14} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-ink/70 text-sm leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-grad-primary flex items-center justify-center text-white font-semibold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-ink/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}