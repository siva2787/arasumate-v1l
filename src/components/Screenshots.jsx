import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  const rail = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  const update = () => {
    const el = rail.current
    if (!el) return
    setCanLeft(el.scrollLeft > 8)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const go = (dir) => {
    const el = rail.current
    if (!el) return
    const card = el.querySelector('[data-shot]')
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

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
          <h2 className="font-display font-bold text-[1.9rem] leading-tight sm:text-4xl md:text-5xl">
            A closer <span className="text-gradient">look inside.</span>
          </h2>
        </motion.div>
      </div>

      <div className="relative">
        {canLeft && (
          <button
            type="button"
            aria-label="Previous screenshot"
            onClick={() => go(-1)}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-glass border border-ink/10 flex items-center justify-center text-ink active:scale-95 transition-transform"
          >
            <ChevronLeft size={22} />
          </button>
        )}
        {canRight && (
          <button
            type="button"
            aria-label="Next screenshot"
            onClick={() => go(1)}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-glass border border-ink/10 flex items-center justify-center text-ink active:scale-95 transition-transform"
          >
            <ChevronRight size={22} />
          </button>
        )}
        <div ref={rail} onScroll={update} className="flex gap-5 sm:gap-8 overflow-x-auto px-6 sm:px-10 pb-6 snap-x snap-mandatory scrollbar-hide">
          {screens.map(({ title, img }, i) => (
            <motion.div
              key={title}
              data-shot
              initial={{ opacity: 0, y: 40, rotateY: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -14, rotateY: -6 }}
              className="snap-center shrink-0 w-52 sm:w-56 aspect-[9/19] rounded-[2.25rem] bg-ink border-[6px] border-ink shadow-2xl overflow-hidden relative"
            >
              <img src={img} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              <p className="absolute bottom-2 left-0 right-0 text-center text-white font-display font-bold text-sm">{title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}