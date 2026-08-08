import mongoose from 'mongoose'

const downloadSchema = new mongoose.Schema(
    {
        source: { type: String, default: 'button' },
    },
    { timestamps: true }
)

export default mongoose.model('Download', downloadSchema)