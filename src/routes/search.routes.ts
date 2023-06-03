import { Router } from 'express'
import { searchBooks } from '../controllers/search.controller'

const router = Router()

router.get('/books', searchBooks)

export default router
