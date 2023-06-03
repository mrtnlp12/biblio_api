import prisma from '../client'
import { Request, Response } from 'express'

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const loan = await prisma.loans.findFirst({
      where: {
        userId: Number(id),
      },
    })

    if (loan) {
      return res.status(400).json({ message: 'User has loans' })
    }

    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    })

    res.json({ message: 'User deleted' })
  } catch (error) {}
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, lastname, password, role, username } = req.body

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        lastname,
        password,
        role,
        username,
      },
    })

    res.status(204).json({ message: 'User updated' })
  } catch (error) {}
}
