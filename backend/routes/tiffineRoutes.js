import express from 'express'
import { registerTiffine, updateTiffine, deleteTiffine, getAllTiffine, getTiffine } from '../controllers/tiffineControllers.js'
import auth from '../middlewares/auth.js'


const router = express.Router()

router.use(auth)

router.post('/register', registerTiffine)
router.put('/:tiffineId', updateTiffine)
router.get('/client/:clientId', getAllTiffine)
router.get('/:tiffineId', getTiffine)
router.delete('/:tiffineId', deleteTiffine)

export default router