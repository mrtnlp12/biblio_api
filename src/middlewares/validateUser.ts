import { Request, Response, NextFunction } from 'express'
import { validateJwt } from '../utils/jwt'

export const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('token') || ''
    const payload = await validateJwt(token)

    if (!payload) {
      return res.status(401).json({
        message: 'Unauthorized',
      })
    }

    req.body.userId = payload.id
    next()
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
