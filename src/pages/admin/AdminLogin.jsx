import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ShieldCheck, ChevronLeft } from 'lucide-react'
import api from '../../lib/api'
import adminIllustration from '../../assets/admin-illustration.png'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data } = await api.post('/admin/login', { username, password })
      localStorage.setItem('arasumate_admin_token', data.token)
      if (remember) localStorage.setItem('arasumate_admin_user', username)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-grad-radial bg-white flex flex-col items-center justify-center px-4 sm:px-6 pt-20 sm:pt-12 pb-10 sm:pb-12 relative overflow-hidden">
      <div className="absolute top-24 left-16 w-32 h-32 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
      <div className="absolute bottom-16 right-20 w-40 h-40 rounded-full bg-accent/20 blur-3xl animate-float" />

      <motion.a
        href="/"
        whileHover={{ x: -3 }}
        className="absolute top-5 left-4 sm:top-8 sm:left-8 inline-flex items-center gap-1.5 glass pl-2.5 pr-4 py-2 rounded-full text-sm font-medium text-ink/70 hover:text-primary shadow-glass transition-colors z-20"
      >
        <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <ChevronLeft size={14} />
        </span>
        Back to site
      </motion.a>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass rounded-3xl shadow-soft overflow-hidden grid md:grid-cols-2 max-w-3xl w-full relative z-10"
      >
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-6 sm:p-8 pb-5 sm:pb-8 relative">
          <span className="relative sm:absolute self-start top-0 sm:top-6 left-0 sm:left-6 mb-4 sm:mb-0 inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-primary shadow-glass z-10">
            <ShieldCheck size={13} /> ADMIN PANEL ACCESS
          </span>

          <img
            src={adminIllustration}
            alt="Admin security"
            className="w-full max-w-[140px] sm:max-w-[240px] rounded-2xl shadow-glass mt-6 sm:mt-10"
          />
        </div>

        <form onSubmit={submit} className="p-8 md:p-10 bg-white/70">
          <h1 className="font-display font-bold text-2xl mb-1">Admin Login</h1>
          <p className="text-sm text-ink/50 mb-7">Secure access to admin panel.</p>

          {error && (
            <div className="mb-4 text-xs font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <label className="block text-xs font-semibold text-ink/60 mb-1.5">Username</label>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            className="w-full bg-white rounded-xl px-4 py-3 text-sm mb-5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/40"
          />

          <label className="block text-xs font-semibold text-ink/60 mb-1.5">Password</label>
          <div className="relative mb-4">
            <input
              required
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="w-full bg-white rounded-xl px-4 py-3 pr-11 text-sm border border-primary/10 outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-ink/60 mb-6 cursor-pointer">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary" />
            Remember me
          </label>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-grad-primary text-white py-3.5 rounded-xl font-semibold shadow-soft disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login'}
          </motion.button>

          <p className="text-center text-xs text-ink/40 mt-4">Only authorized admins can access this panel.</p>
        </form>
      </motion.div>
    </div>
  )
}