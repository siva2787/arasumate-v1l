import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
import { Download, ArrowRight, ShieldCheck, WifiOff, Zap, Ban, ChevronDown, Bell, Menu, User, AlertTriangle, ChevronRight, Home, CalendarCheck, BarChart3, CalendarDays, UserRound, FileText, FolderOpen, BellRing } from 'lucide-react'
import FloatingShapes from './FloatingShapes'

export default function Hero() {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -120])

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const badges = [
    { icon: WifiOff, label: 'Offline First' },
    { icon: ShieldCheck, label: 'Secure' },
    { icon: Zap, label: 'Fast' },
    { icon: Ban, label: 'No Ads' },
  ]

  const classes = [
    { time: '9:15 AM', name: 'Cloud Computing', tag: 'Theory', color: 'border-emerald-400', chip: 'bg-emerald-100 text-emerald-700' },
    { time: '10:05 AM', name: 'Deep Learning', tag: 'Theory', color: 'border-sky-400', chip: 'bg-sky-100 text-sky-700' },
    { time: '11:10 AM', name: 'Distributed Computing', tag: 'Theory', color: 'border-orange-400', chip: 'bg-orange-100 text-orange-700' },
    { time: '12:00 PM', name: 'Big Data Analytics', tag: 'Theory', color: 'border-sky-400', chip: 'bg-sky-100 text-sky-700' },
    { time: '1:30 PM', name: 'CC Lab', tag: 'Lab', color: 'border-gray-400', chip: 'bg-gray-100 text-gray-700' },
  ]

  const quickActions = [
    { icon: FileText, label: 'Leave Request' },
    { icon: BellRing, label: 'Notices' },
    { icon: FolderOpen, label: 'Resources' },
    { icon: FileText, label: 'PYQ Papers' },
  ]

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: CalendarCheck, label: 'Attendance' },
    { icon: BarChart3, label: 'Marks' },
    { icon: CalendarDays, label: 'Timetable' },
    { icon: UserRound, label: 'Profile' },
  ]

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouse}
      className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-14 sm:pb-16 overflow-hidden bg-grad-radial"
    >
      <FloatingShapes />
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full relative z-10">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium text-primary mb-6"
          >
            ✨ Smart Academic Companion
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl xl:text-8xl leading-[1.05] text-gradient mb-5 sm:mb-6 break-words"
          >
            KAMPLY
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-ink mb-4 sm:mb-6"
          >
            Smart Academics,<br /> Smarter You.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-ink/60 text-base sm:text-lg max-w-md mb-7 sm:mb-8 leading-relaxed"
          >
            Track attendance, manage tasks, calculate CGPA, receive real-time notifications and organize your entire academic life in one beautiful Android application.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, staggerChildren: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-7 sm:mb-8"
          >
            <a href="#download" className="inline-flex items-center justify-center gap-2 bg-grad-primary text-white px-7 py-3.5 sm:py-4 rounded-full font-semibold shadow-soft hover:scale-105 transition-transform">
              <Download size={18} /> Download APK
            </a>
            <a href="#features" className="inline-flex items-center justify-center gap-2 glass px-7 py-3.5 sm:py-4 rounded-full font-semibold hover:scale-105 transition-transform">
              Explore Features <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-2 sm:gap-3"
          >
            {badges.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium text-ink/60 bg-white/70 border border-primary/10 px-3 py-1.5 rounded-full">
                <Icon size={14} className="text-primary" /> {label}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="relative flex justify-center items-center mt-4 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-grad-primary opacity-20 blur-3xl"
          />
          <motion.div
            className="absolute bottom-0 w-72 h-16 rounded-full bg-primary/20 blur-2xl"
          />

          <motion.div
            style={{ rotateX, rotateY, y: phoneY, perspective: 1200 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-60 sm:w-64 md:w-72 aspect-[9/19] rounded-[2.75rem] bg-ink border-[6px] border-ink shadow-2xl overflow-hidden z-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-ink rounded-b-2xl z-20" />
            <div className="w-full h-full bg-white overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 pt-8 pb-2">
                <Menu size={14} className="text-ink/60" />
                <p className="text-[13px] font-display font-bold text-ink">Dashboard</p>
                <span className="relative">
                  <Bell size={14} className="text-primary" />
                  <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-red-500 text-white text-[6px] flex items-center justify-center">9</span>
                </span>
              </div>

              <div className="px-4 pt-2">
                <div className="bg-grad-primary rounded-2xl p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-[9px] italic">Good Night,</p>
                    <p className="text-white text-sm font-semibold">Siva 👋</p>
                    <p className="text-white/70 text-[8px] italic mt-0.5">Sem 5 · AI &amp; DS</p>
                  </div>
                  <span className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center shrink-0">
                    <User size={16} className="text-white" />
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="bg-white border border-ink/10 rounded-xl p-2.5">
                    <p className="text-[8px] text-ink/40">Attendance</p>
                    <p className="text-sm font-bold text-ink">72%</p>
                    <p className="text-[7px] text-orange-500 font-medium">Average</p>
                  </div>
                  <div className="bg-white border border-ink/10 rounded-xl p-2.5">
                    <p className="text-[8px] text-ink/40">Internals</p>
                    <p className="text-sm font-bold text-ink">78%</p>
                    <p className="text-[7px] text-emerald-500 font-medium">Good</p>
                  </div>
                </div>

                <div className="flex items-start gap-1.5 bg-orange-50 border border-orange-200 rounded-xl px-2.5 py-2 mt-2.5">
                  <AlertTriangle size={10} className="text-orange-500 mt-0.5 shrink-0" />
                  <p className="text-[7px] text-orange-700 leading-snug flex-1">Low Attendance! You need 75% to be eligible for exams.</p>
                  <ChevronRight size={10} className="text-orange-400 shrink-0 mt-0.5" />
                </div>

                <div className="flex items-center justify-between mt-3 mb-1.5">
                  <p className="text-[10px] font-bold text-ink">Today's Classes</p>
                  <p className="text-[8px] text-primary font-medium">See All</p>
                </div>

                <div className="space-y-1.5">
                  {classes.map((c) => (
                    <div key={c.name} className={`flex items-center justify-between bg-white border-l-2 ${c.color} border-y border-r border-ink/10 rounded-lg pl-2 pr-2.5 py-1.5`}>
                      <div>
                        <p className="text-[7px] text-ink/40">{c.time}</p>
                        <p className="text-[9px] font-semibold text-ink leading-tight">{c.name}</p>
                      </div>
                      <span className={`text-[7px] font-medium px-1.5 py-0.5 rounded-full ${c.chip}`}>{c.tag}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] font-bold text-ink mt-3 mb-1.5">Quick Actions</p>
                <div className="grid grid-cols-4 gap-1.5">
                  {quickActions.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center justify-center gap-1 bg-primary/10 rounded-lg py-2 px-1">
                      <Icon size={12} className="text-primary" />
                      <span className="text-[6px] font-medium text-ink/70 text-center leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between px-3 py-2.5 border-t border-ink/10">
                {navItems.map(({ icon: Icon, label, active }) => (
                  <div key={label} className={`flex flex-col items-center gap-0.5 ${active ? 'text-primary' : 'text-ink/30'}`}>
                    <Icon size={12} />
                    <span className="text-[6px] font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute top-10 left-0 w-6 h-6 rounded-full bg-primary animate-float-slow" />
          <motion.div className="absolute top-24 right-0 w-10 h-10 sm:w-14 sm:h-14 rounded-full border-4 border-secondary/50 animate-float" />
          <motion.div className="absolute bottom-16 left-4 w-10 h-10 rounded-xl bg-accent/60 animate-float-delay" />
          <motion.div className="absolute bottom-6 right-8 w-8 h-8 rounded-full bg-grad-primary animate-float" />
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-ink/40 text-xs"
      >
        Scroll Down <ChevronDown size={16} />
      </motion.div>
    </section>
  )
}