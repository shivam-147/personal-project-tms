import jwt from 'jsonwebtoken'
import user from '../models/user.js'

const auth = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token']
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized access',
                payload: null,
                status: 401
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const decodedUser = await user.findById({_id: decoded._id}).select('-password')
        req.user = decodedUser

        next()
    } catch (err) {
        console.log('[ERROR AUTH MIDDLEWARE]', err.message)
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            payload: null,
            status: 500
        })
    }
}

export default auth