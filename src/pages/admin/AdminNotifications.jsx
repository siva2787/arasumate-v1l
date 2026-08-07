import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, BellRing, Users, Smartphone } from 'lucide-react'
import AdminLayout from './AdminLayout'
import api from '../../lib/api'

export default function AdminNotifications() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [target, setTarget] = useState('all')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setResult(null)
    try {
      const { data } = await api.post('/admin/notifications/send', { title, body, target })
      setResult({ ok: true, message: `Sent to ${data.sentCount ?? 'all'} devices.` })
      setTitle('')
      setBody('')
    } catch (err) {
      setResult({ ok: false, message: err.response?.data?.message || 'Failed to send notification.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl">Send Notification</h1>
        <p className="text-sm text-ink/50">Broadcast a push notification to installed ARASUMATE apps via Firebase Cloud Messaging.</p>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-7 shadow-glass"
        >
          <label className="block text-xs font-semibold text-ink/60 mb-1.5">Notification Title</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Department Meeting Reminder"
            className="w-full bg-primary/5 rounded-xl px-4 py-3 text-sm mb-5 outline-none focus:ring-2 focus:ring-primary/30"
          />

          <label className="block text-xs font-semibold text-ink/60 mb-1.5">Message</label>
          <textarea
            required
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type the notification message..."
            className="w-full bg-primary/5 rounded-xl px-4 py-3 text-sm mb-5 outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />

          <label className="block text-xs font-semibold text-ink/60 mb-2">Send To</label>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setTarget('all')}
              className={`flex items-center gap-2 justify-center rounded-xl py-3 text-sm font-medium border transition-colors ${
                target === 'all' ? 'bg-grad-primary text-white border-transparent' : 'border-primary/10 text-ink/60'
              }`}
            >
              <Users size={15} /> All Users
            </button>
            <button
              type="button"
              onClick={() => setTarget('active')}
              className={`flex items-center gap-2 justify-center rounded-xl py-3 text-sm font-medium border transition-colors ${
                target === 'active' ? 'bg-grad-primary text-white border-transparent' : 'border-primary/10 text-ink/60'
              }`}
            >
              <Smartphone size={15} /> Active Only
            </button>
          </div>

          {result && (
            <div className={`mb-4 text-xs font-medium rounded-lg px-3 py-2 ${result.ok ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {result.message}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={sending}
            type="submit"
            className="inline-flex items-center gap-2 bg-grad-primary text-white px-7 py-3.5 rounded-xl font-semibold shadow-soft disabled:opacity-60"
          >
            <Send size={16} /> {sending ? 'Sending...' : 'Send Notification'}
          </motion.button>
        </motion.form>

        <div className="bg-ink text-white rounded-2xl p-7">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Live Preview</p>
          <div className="bg-white/10 rounded-2xl p-4 flex gap-3 items-start">
            <span className="w-9 h-9 rounded-lg bg-grad-primary flex items-center justify-center shrink-0">
              <BellRing size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold">{title || 'Notification title'}</p>
              <p className="text-xs text-white/50 mt-1">{body || 'Your message will appear here.'}</p>
              <p className="text-[10px] text-white/30 mt-2">ARASUMATE • now</p>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-6 leading-relaxed">
            Notifications are delivered through Firebase Cloud Messaging to every device that installed the ARASUMATE APK from your website and registered its FCM token.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
