import { Router } from 'express'
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.controller'

const router = Router()

router.get('/', getUsers)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)

export default router
