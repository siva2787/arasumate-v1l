import { Router } from 'express'
import { Resend } from 'resend'

const router = Router()
const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email and message are required' })
    }

    try {
        await resend.emails.send({
            from: 'ARASUMATE Contact <onboarding@resend.dev>',
            to: process.env.MAIL_TO,
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