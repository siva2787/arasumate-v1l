import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        fcmToken: { type: String, required: true, unique: true },
        studentId: { type: String, default: '' },
        department: { type: String, default: '' },
        year: { type: String, default: '' },
        semester: { type: String, default: '' },
        platform: { type: String, default: 'android' },
        lastActiveAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export default mongoose.model('User', userSchema)