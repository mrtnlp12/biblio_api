import { Router } from 'express'
import { getGenres, createGenre } from '../controllers/genre.controller'
const router = Router()

router.get('/', getGenres)
router.post('/', createGenre)

export default router
