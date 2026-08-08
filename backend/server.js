import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import adminRoutes from './routes/admin.js'
import deviceRoutes from './routes/devices.js'
import contactRoutes from './routes/contact.js'
import downloadRoutes from './routes/downloads.js'

const app = express()
app.use(cors())
app.use(express.json())

const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/admin', adminRoutes)
app.use('/api/devices', deviceRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/downloads', downloadRoutes)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 10000

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message)
        process.exit(1)
    })