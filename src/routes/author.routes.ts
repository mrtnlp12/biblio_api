import { Router } from 'express'
import { getAuthors, createAuthor } from '../controllers/author.controller'

const router = Router()

router.get('/', getAuthors)
router.post('/', createAuthor)

export default router
