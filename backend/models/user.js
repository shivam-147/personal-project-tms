import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

userSchema.pre('save', async function () {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const user = model('User', userSchema)

export default user