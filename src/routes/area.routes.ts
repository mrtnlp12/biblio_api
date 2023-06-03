import { Router } from 'express'
import { getAreas, createArea } from '../controllers/area.controller'
const router = Router()

router.get('/', getAreas)

router.post('/', createArea)

export default router
