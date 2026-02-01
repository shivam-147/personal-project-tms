import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                payload: null,
                status: 400
            })
        }

        const exists = await User.findOne({ email })

        if (exists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
                payload: null,
                status: 400
            })
        }

        const user = await User.create({ name, email, password })

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
            payload: { token, name },
            status: 201
        })

    } catch (err) {
        console.log('[ERROR USER REGISTER]', err.message)
        res.status(500).json({
            success: false,
            message: 'Inter Server Error',
            payload: null,
            status: 500
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                payload: null,
                status: 400
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exists',
                payload: null,
                status: 400
            })
        }

        const isVerified = await user.comparePassword(password)

        if (!isVerified) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials',
                payload: null,
                status: 401
            })
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            payload: { token, name: user.name },
            status: 200
        })


    } catch (err) {
        console.log('[ERROR USER LOGIN]', err.message)
        res.status(500).json({
            success: false,
            message: 'Inter Server Error',
            payload: null,
            status: 500
        })
    }
}

/* {
    success: true,
    message: "x",
    payload:
    status: code
} */

export { register, login }