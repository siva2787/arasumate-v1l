import { Router } from 'express'
import User from '../models/User.js'

const router = Router()

// Called by the app (push_notification_service.dart) whenever it has a
// fresh FCM token, so notifications can be broadcast to installed devices.
// This is the only data the app ever sends to the server — no attendance,
// marks, or academic records leave the device.
router.post('/register', async (req, res) => {
    const { token, studentId, department, year, semester, platform } = req.body
    if (!token) return res.status(400).json({ message: 'token is required' })

    const user = await User.findOneAndUpdate(
        { fcmToken: token },
        { studentId, department, year, semester, platform, lastActiveAt: new Date() },
        { upsert: true, new: true }
    )

    res.json({ user })
})

export default router