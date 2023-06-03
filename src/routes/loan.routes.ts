import { Router } from 'express'
import {
  generateLoan,
  getLoans,
  deleteLoan,
} from '../controllers/loan.controller'
import { validateUser } from '../middlewares/validateUser'

const router = Router()

router.get('/', getLoans)
router.post('/', validateUser, generateLoan)
router.delete('/:id', deleteLoan)

export default router
