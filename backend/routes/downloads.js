import { Router } from 'express'
import Download from '../models/Download.js'

const router = Router()

// Called by the site whenever someone taps Download APK or scans the QR code
router.post('/track', async (req, res) => {
    const { source = 'button' } = req.body
    await Download.create({ source })
    res.json({ ok: true })
})

export default router