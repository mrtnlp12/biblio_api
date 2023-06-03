import { register, login, isauth } from '../controllers/auth.controller'
import { Router } from 'express'
const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/isauth', isauth)

export default router
