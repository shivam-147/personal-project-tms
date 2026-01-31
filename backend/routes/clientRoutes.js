import express from 'express'
import auth from '../middlewares/auth.js'
import { registerClient, getAllClient, getClient, updateClient, deleteClient } from '../controllers/clientControllers.js'

const router = express.Router()
router.use(auth)

router.post('/register', registerClient)
router.get('/', getAllClient)
router.get('/:clientId', getClient)
router.put('/:clientId', updateClient)
router.delete('/:clientId', deleteClient)

export default router