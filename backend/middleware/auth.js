export default function requireAdmin(req, res, next) {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null

    if (!token || token !== process.env.ADMIN_KEY) {
        return res.status(401).json({ message: 'Not authenticated' })
    }

    next()
}