import { useEffect, useState } from 'react'
import { Search, Smartphone } from 'lucide-react'
import AdminLayout from './AdminLayout'
import api from '../../lib/api'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/admin/users')
        setUsers(data.users || [])
      } catch {
        // backend not connected yet
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = users.filter((u) =>
    (u.name || u.deviceId || '').toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-bold text-2xl">Users</h1>
          <p className="text-sm text-ink/50">Everyone who installed ARASUMATE from your website.</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users..."
            className="bg-white rounded-xl pl-10 pr-4 py-2.5 text-sm shadow-glass outline-none focus:ring-2 focus:ring-primary/30 w-64"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-glass overflow-x-auto">
        {loading ? (
          <p className="text-sm text-ink/40 py-10 text-center">Loading users…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-ink/40 py-10 text-center">
            No users found — connect your backend's <code className="text-primary">/api/admin/users</code> endpoint to populate this list from MongoDB.
          </p>
        ) : (
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-ink/40 text-xs border-b border-ink/5">
                <th className="pb-3 font-medium">Name / Device</th>
                <th className="pb-3 font-medium">Department</th>
                <th className="pb-3 font-medium">FCM Token</th>
                <th className="pb-3 font-medium">Installed</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-ink/5 last:border-0">
                  <td className="py-3.5 flex items-center gap-2 font-medium">
                    <Smartphone size={14} className="text-primary" /> {u.name || u.deviceId}
                  </td>
                  <td className="py-3.5 text-ink/50">{u.department || '—'}</td>
                  <td className="py-3.5 text-ink/40 font-mono text-xs">{(u.fcmToken || '').slice(0, 18)}…</td>
                  <td className="py-3.5 text-ink/50">{new Date(u.installedAt).toLocaleDateString()}</td>
                  <td className="py-3.5">
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
