import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Users, Smartphone, BellRing, TrendingUp, Download } from 'lucide-react'
import AdminLayout from './AdminLayout'
import api from '../../lib/api'

const ranges = [7, 15, 30]

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, notificationsSent: 0, installsToday: 0 })
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState(15)
  const [series, setSeries] = useState([])
  const [totalDownloads, setTotalDownloads] = useState(0)

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

  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const { data } = await api.get(`/admin/downloads/stats?days=${range}`)
        setSeries(data.series || [])
        setTotalDownloads(data.total || 0)
      } catch {
        setSeries([])
      }
    }
    loadDownloads()
  }, [range])

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'bg-primary/10 text-primary' },
    { label: 'Active Devices', value: stats.activeUsers, icon: Smartphone, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Notifications Sent', value: stats.notificationsSent, icon: BellRing, color: 'bg-orange-100 text-orange-600' },
    { label: 'Installs Today', value: stats.installsToday, icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
  ]

  const maxCount = Math.max(1, ...series.map((s) => s.count))

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

      <div className="bg-white rounded-2xl p-6 shadow-glass mb-8">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h2 className="font-display font-semibold text-lg">App Downloads</h2>
            <p className="text-xs text-ink/40">
              <CountUp end={totalDownloads} duration={1} /> downloads in the last {range} days
            </p>
          </div>
          <div className="flex gap-1.5 bg-primary/5 rounded-xl p-1">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${range === r ? 'bg-grad-primary text-white' : 'text-ink/50 hover:text-ink'
                  }`}
              >
                {r}d
              </button>
            ))}
          </div>
        </div>

        <div className="h-48 flex items-end gap-1 mt-6 overflow-x-auto">
          {series.length === 0 ? (
            <p className="w-full text-center text-sm text-ink/40 self-center py-10">No download data yet.</p>
          ) : (
            series.map((s, i) => {
              const showLabel = range <= 15 || i % Math.ceil(range / 10) === 0
              return (
                <div key={s.date} className="flex-1 min-w-[18px] flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[9px] text-ink/40 opacity-0 group-hover:opacity-100 transition-opacity">{s.count}</span>
                  <div
                    className="w-full bg-grad-primary rounded-t-md transition-all duration-500"
                    style={{ height: `${Math.max(4, (s.count / maxCount) * 100)}%` }}
                  />
                  <span className="text-[8px] text-ink/30 whitespace-nowrap rotate-0">
                    {showLabel
                      ? new Date(s.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })
                      : ''}
                  </span>
                </div>
              )
            })
          )}
        </div>
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
                <th className="pb-3 font-medium">Student ID</th>
                <th className="pb-3 font-medium">Installed On</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((u) => (
                <tr key={u._id} className="border-b border-ink/5 last:border-0">
                  <td className="py-3 font-medium">{u.studentId || u.fcmToken?.slice(0, 14) + '…'}</td>
                  <td className="py-3 text-ink/50">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${Date.now() - new Date(u.lastActiveAt).getTime() < 86400000 ? 'bg-emerald-100 text-emerald-600' : 'bg-ink/5 text-ink/40'}`}>
                      {Date.now() - new Date(u.lastActiveAt).getTime() < 86400000 ? 'Active' : 'Inactive'}
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