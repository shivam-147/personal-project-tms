import { Schema, model } from 'mongoose'

const tiffineSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    morningTiffine: {
        type: Boolean,
        default: false
    },
    afternoonTiffine: {
        type: Boolean,
        default: false
    },
    nightTiffine: {
        type: Boolean,
        default: false
    }
})

const tiffine = model('Tiffine', tiffineSchema)

export default tiffine 