import jwt from 'jsonwebtoken'
import { environment } from '../config'

export const validateJwt = async (token: string) => {
  try {
    const decoded = jwt.verify(token, environment.JWT_SECRET)
    return decoded as jwt.JwtPayload
  } catch (error) {
    return null
  }
}

export const generateJwt = async (payload: any) => {
  const token = jwt.sign(payload, environment.JWT_SECRET, {
    expiresIn: '1d',
  })
  return token
}
