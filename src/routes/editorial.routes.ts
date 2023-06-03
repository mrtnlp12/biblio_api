import { Router } from 'express'
import {
  getEditorials,
  createEditorial,
  updateEditorial,
} from '../controllers/editorial.controller'

const router = Router()

router.get('/', getEditorials)
router.post('/', createEditorial)
router.put('/:id', updateEditorial)

export default router
