import { Router } from 'express'
import {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/book.controller'
const router = Router()

router.get('/', getBooks)

router.get('/:id', getBook)

router.post('/', createBook)

router.put('/:id', updateBook)

router.delete('/:id', deleteBook)

export default router
