import { Request, Response } from 'express'
import prisma from '../client'
import bcrypt from 'bcrypt'

import { generateJwt, validateJwt } from '../utils/jwt'

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password',
      })
    }

    const token = await generateJwt({
      id: user.id,
      username: user.username,
    })

    return res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, role: user.role },
      token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, username, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (user) {
      return res.status(409).json({
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        username,
        name,
        lastname,
        password: hashedPassword,
      },
    })

    return res.status(201).json({
      message: 'User created',
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export async function isauth(req: Request, res: Response) {
  try {
    const { token } = req.body

    const decoded = await validateJwt(token)

    if (!decoded) {
      return res.status(200).json({
        message: 'Invalid token',
        isauth: false,
      })
    }

    return res.status(200).json({
      message: 'User authenticated',
      isAuth: true,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal server error',
    })
  }
}
