import { motion } from 'framer-motion'
import marks from '../assets/marks.jpg'
import attendance from '../assets/attendance.jpg'
import cgpa from '../assets/cgpa.jpg'
import resources from '../assets/resources.jpg'
import notifications from '../assets/notifications.jpg'

const screens = [
  { title: 'Marks', img: marks },
  { title: 'Attendance', img: attendance },
  { title: 'CGPA', img: cgpa },
  { title: 'Resources', img: resources },
  { title: 'Notifications', img: notifications },
]

export default function Screenshots() {
  return (
    <section id="screenshots" className="section-pad bg-gradient-to-b from-white to-primary/5 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12 px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-3">Screenshots</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl">
            A closer <span className="text-gradient">look inside.</span>
          </h2>
        </motion.div>
      </div>

      <div className="flex gap-8 overflow-x-auto px-10 pb-6 snap-x snap-mandatory scrollbar-hide">
        {screens.map(({ title, img }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 40, rotateY: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            whileHover={{ y: -14, rotateY: -6 }}
            className="snap-center shrink-0 w-56 aspect-[9/19] rounded-[2.25rem] bg-ink border-[6px] border-ink shadow-2xl overflow-hidden relative"
          >
            <img src={img} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            <p className="absolute bottom-2 left-0 right-0 text-center text-white font-display font-bold text-sm">{title}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}