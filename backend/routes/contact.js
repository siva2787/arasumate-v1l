import { Router } from 'express'
import nodemailer from 'nodemailer'

const router = Router()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
})

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email and message are required' })
    }

    try {
        await transporter.sendMail({
            from: `"ARASUMATE Contact" <${process.env.MAIL_USER}>`,
            to: process.env.MAIL_TO || process.env.MAIL_USER,
            replyTo: email,
            subject: `[ARASUMATE Contact] ${subject || 'New message'}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || '-'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
        })
        res.json({ message: 'Message sent' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Failed to send message' })
    }
})

export default router