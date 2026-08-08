import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import requireAdmin from '../middleware/auth.js'
import User from '../models/User.js'
import Notification from '../models/Notification.js'
import Download from '../models/Download.js'
import { getFirebaseAdmin } from '../utils/firebase.js'

const router = Router()

const uploadsDir = path.join(process.cwd(), 'uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`),
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

router.post('/login', (req, res) => {
    const { password } = req.body

    if (password !== process.env.ADMIN_KEY) {
        return res.status(401).json({ message: 'Invalid username or password' })
    }

    res.json({ token: process.env.ADMIN_KEY })
})

router.get('/stats', requireAdmin, async (req, res) => {
    const totalUsers = await User.countDocuments()
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const activeUsers = await User.countDocuments({ lastActiveAt: { $gte: oneDayAgo } })
    const installsToday = await User.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } })
    const notificationsSent = await Notification.countDocuments()
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5)

    res.json({
        stats: { totalUsers, activeUsers, notificationsSent, installsToday },
        recentUsers,
    })
})

router.get('/users', requireAdmin, async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 })
    res.json({ users })
})

router.post('/notifications/send', requireAdmin, upload.single('image'), async (req, res) => {
    const { title, body, target = 'all' } = req.body
    if (!title || !body) return res.status(400).json({ message: 'Title and body are required' })

    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : ''

    const query = target === 'all' ? { fcmToken: { $ne: '' } } : { fcmToken: { $ne: '' }, platform: target }
    const recipients = await User.find(query)
    const tokens = recipients.map((u) => u.fcmToken).filter(Boolean)

    let successCount = 0
    if (tokens.length) {
        const admin = getFirebaseAdmin()
        const result = await admin.messaging().sendEachForMulticast({
            tokens,
            notification: { title, body, imageUrl: imageUrl || undefined },
        })
        successCount = result.successCount
    }

    await Notification.create({ title, body, imageUrl, target, recipientCount: successCount })
    res.json({ message: 'Notification sent', recipientCount: successCount })
})

router.get('/notifications', requireAdmin, async (req, res) => {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50)
    res.json({ notifications })
})

router.get('/downloads/stats', requireAdmin, async (req, res) => {
    const days = Math.min(parseInt(req.query.days) || 15, 90)
    const since = new Date()
    since.setHours(0, 0, 0, 0)
    since.setDate(since.getDate() - (days - 1))

    const rows = await Download.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    ])
    const byDate = Object.fromEntries(rows.map((r) => [r._id, r.count]))

    const series = []
    for (let i = 0; i < days; i++) {
        const d = new Date(since)
        d.setDate(since.getDate() + i)
        const key = d.toISOString().slice(0, 10)
        series.push({ date: key, count: byDate[key] || 0 })
    }

    res.json({ days, series, total: series.reduce((sum, s) => sum + s.count, 0) })
})

export default router