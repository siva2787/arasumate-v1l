import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        imageUrl: { type: String, default: '' },
        target: { type: String, default: 'all' },
        recipientCount: { type: Number, default: 0 },
    },
    { timestamps: true }
)

export default mongoose.model('Notification', notificationSchema)