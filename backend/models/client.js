import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    frequency: {
        type: String,
        enum: ['ONCE', 'TWICE', 'TRICE'],
        default: 'TWICE',
        required: true,
    },
    advanceAmount: {
        type: Number,
        default: 0
    },
    ratePerTiffine: {
        type: Number,
        required: true,
        default: 0,
    },
    dateOfStart: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const client = model('Client', clientSchema)

export default client 