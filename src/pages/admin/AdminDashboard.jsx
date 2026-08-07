import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Users, Smartphone, BellRing, TrendingUp } from 'lucide-react'
import AdminLayout from './AdminLayout'
import api from '../../lib/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, notificationsSent: 0, installsToday: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/admin/stats')
        setStats(data.stats)
        setRecent(data.recentUsers || [])
      } catch {
        // backend not connected yet
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Active Devices', value: stats.activeUsers, icon: Smartphone, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Notifications Sent', value: stats.notificationsSent, icon: BellRing, color: 'bg-orange-100 text-orange-600' },
    { label: 'Installs Today', value: stats.installsToday, icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
  ]

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl">Dashboard</h1>
        <p className="text-sm text-ink/50">Overview of ARASUMATE app installs and activity.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 shadow-glass"
          >
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${color}`}>
              <Icon size={18} />
            </span>
            <p className="font-display font-bold text-2xl">
              {!loading && <CountUp end={value} duration={1.2} />}
            </p>
            <p className="text-xs text-ink/50">{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-glass">
        <h2 className="font-display font-semibold text-lg mb-4">Recently Installed</h2>
        {recent.length === 0 ? (
          <p className="text-sm text-ink/40 py-8 text-center">
            No install data yet — connect your backend's <code className="text-primary">/api/admin/stats</code> endpoint to populate this.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink/40 text-xs border-b border-ink/5">
                <th className="pb-3 font-medium">Device / User</th>
                <th className="pb-3 font-medium">Installed On</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((u) => (
                <tr key={u.id} className="border-b border-ink/5 last:border-0">
                  <td className="py-3 font-medium">{u.name || u.deviceId}</td>
                  <td className="py-3 text-ink/50">{new Date(u.installedAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${u.active ? 'bg-emerald-100 text-emerald-600' : 'bg-ink/5 text-ink/40'}`}>
                      {u.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  )
}
