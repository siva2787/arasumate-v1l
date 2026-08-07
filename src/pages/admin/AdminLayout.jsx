import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, BellRing, LogOut, Sparkles } from 'lucide-react'

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/notifications', label: 'Notifications', icon: BellRing },
]

export default function AdminLayout({ children }) {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('arasumate_admin_token')
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-primary/5 flex">
      <aside className="w-64 shrink-0 bg-ink text-white flex flex-col p-5 fixed h-screen">
        <div className="flex items-center gap-2 font-display font-bold text-lg mb-10 px-1">
          <span className="w-9 h-9 rounded-xl bg-grad-primary flex items-center justify-center">
            <Sparkles size={18} />
          </span>
          ARASUMATE
          <span className="text-[10px] font-normal text-white/40 -ml-1">/admin</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-grad-primary text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={17} /> {label}
            </NavLink>
          ))}
        </nav>

        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-red-400 transition-colors">
          <LogOut size={17} /> Logout
        </button>
      </aside>

      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  )
}
