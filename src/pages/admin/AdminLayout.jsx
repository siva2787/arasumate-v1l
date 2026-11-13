import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Users, BellRing, LogOut, Menu, X } from 'lucide-react'
import logo from '../../assets/logo.png'

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/notifications', label: 'Notifications', icon: BellRing },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem('arasumate_admin_token')
    navigate('/admin')
  }

  const SidebarContent = (
    <>
      <div className="flex items-center gap-2 font-display font-bold text-lg mb-10 px-1">
        <img src={logo} alt="KAMPLY" className="w-9 h-9 rounded-xl" />
        KAMPLY
        <span className="text-[10px] font-normal text-white/40 -ml-1">/admin</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-grad-primary text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>

      <motion.button
        onClick={logout}
        whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(239,68,68,0.5)' }}
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-white text-red-500 overflow-hidden group shadow-[0_0_15px_rgba(239,68,68,0.25)]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-red-50 via-white to-red-50 opacity-0 group-hover:opacity-100 transition-opacity" />
        <LogOut size={17} className="relative z-10" />
        <span className="relative z-10">Logout</span>
      </motion.button>
    </>
  )

  return (
    <div className="min-h-screen bg-primary/5">
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-ink text-white px-5 py-4">
        <div className="flex items-center gap-2 font-display font-bold text-base">
          <img src={logo} alt="KAMPLY" className="w-8 h-8 rounded-lg" />
          KAMPLY
        </div>
        <button onClick={() => setOpen(true)}>
          <Menu size={22} />
        </button>
      </header>

      <aside className="hidden lg:flex w-64 shrink-0 bg-ink text-white flex-col p-5 fixed h-screen">
        {SidebarContent}
      </aside>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="lg:hidden fixed top-0 left-0 h-screen w-72 bg-ink text-white flex flex-col p-5 z-50"
            >
              <button onClick={() => setOpen(false)} className="absolute top-5 right-5 text-white/60">
                <X size={20} />
              </button>
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="lg:ml-64 p-5 lg:p-8">{children}</main>
    </div>
  )
}