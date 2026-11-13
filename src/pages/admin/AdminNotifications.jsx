import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Send, BellRing, Users, Smartphone, ImagePlus, X, History } from 'lucide-react'
import AdminLayout from './AdminLayout'
import api from '../../lib/api'

export default function AdminNotifications() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [target, setTarget] = useState('all')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(true)

  const loadHistory = async () => {
    setHistoryLoading(true)
    try {
      const { data } = await api.get('/admin/notifications')
      setHistory(data.notifications || [])
    } catch {
      setHistory([])
    } finally {
      setHistoryLoading(false)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImage(null)
    setPreview('')
  }

  const submit = async (e) => {
    e.preventDefault()
    setSending(true)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('body', body)
      formData.append('target', target)
      if (image) formData.append('image', image)

      const { data } = await api.post('/admin/notifications/send', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult({ ok: true, message: `Sent to ${data.recipientCount ?? 'all'} devices.` })
      setTitle('')
      setBody('')
      removeImage()
      loadHistory()
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
        <p className="text-sm text-ink/50">Broadcast a push notification, with an optional image, to installed KAMPLY apps.</p>
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

          <label className="block text-xs font-semibold text-ink/60 mb-2">Image (optional)</label>
          {preview ? (
            <div className="relative mb-5 rounded-xl overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-36 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="mb-5 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-primary/20 rounded-xl py-8 cursor-pointer hover:border-primary/40 transition-colors">
              <ImagePlus size={22} className="text-primary/50" />
              <span className="text-xs text-ink/40">Click to upload an image</span>
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
            </label>
          )}

          <label className="block text-xs font-semibold text-ink/60 mb-2">Send To</label>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setTarget('all')}
              className={`flex items-center gap-2 justify-center rounded-xl py-3 text-sm font-medium border transition-colors ${target === 'all' ? 'bg-grad-primary text-white border-transparent' : 'border-primary/10 text-ink/60'
                }`}
            >
              <Users size={15} /> All Users
            </button>
            <button
              type="button"
              onClick={() => setTarget('active')}
              className={`flex items-center gap-2 justify-center rounded-xl py-3 text-sm font-medium border transition-colors ${target === 'active' ? 'bg-grad-primary text-white border-transparent' : 'border-primary/10 text-ink/60'
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
          <div className="bg-white/10 rounded-2xl overflow-hidden">
            {preview && <img src={preview} alt="" className="w-full h-32 object-cover" />}
            <div className="p-4 flex gap-3 items-start">
              <span className="w-9 h-9 rounded-lg bg-grad-primary flex items-center justify-center shrink-0">
                <BellRing size={16} />
              </span>
              <div>
                <p className="text-sm font-semibold">{title || 'Notification title'}</p>
                <p className="text-xs text-white/50 mt-1">{body || 'Your message will appear here.'}</p>
                <p className="text-[10px] text-white/30 mt-2">KAMPLY • now</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-6 leading-relaxed">
            Notifications are delivered to every device that installed the KAMPLY APK from your website and registered its push token. An uploaded image shows as a banner in the notification.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-glass mt-6">
        <h2 className="flex items-center gap-2 font-display font-semibold text-lg mb-4">
          <History size={18} className="text-primary" /> Notification History
        </h2>
        {historyLoading ? (
          <p className="text-sm text-ink/40 py-6 text-center">Loading...</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-ink/40 py-6 text-center">No notifications sent yet.</p>
        ) : (
          <div className="divide-y divide-ink/5">
            {history.map((n) => (
              <div key={n._id} className="flex items-start gap-3 py-4">
                {n.imageUrl ? (
                  <img src={n.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                ) : (
                  <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <BellRing size={18} />
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-xs text-ink/50 mt-0.5">{n.body}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-ink/40">{new Date(n.createdAt).toLocaleString()}</span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full capitalize">{n.target}</span>
                    <span className="text-[10px] text-ink/40">{n.recipientCount} recipients</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}