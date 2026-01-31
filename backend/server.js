import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { dbconfig } from './config/database.js'
import authRoutes from './routes/authRoutes.js'
import clientRoutes from './routes/clientRoutes.js'
import tiffineRoutes from './routes/tiffineRoutes.js'

await dbconfig()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/tiffine', tiffineRoutes)

app.get('/', (req, res) => {
    res.send('<h1>Healthy Server</h1>');
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`[SERVER] is up on ${PORT}`)
})