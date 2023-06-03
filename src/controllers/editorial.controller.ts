import { Request, Response } from 'express'
import prisma from '../client'

export const getEditorials = async (req: Request, res: Response) => {
  try {
    const editorials = await prisma.editorials.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    res.status(200).json(editorials)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const createEditorial = async (req: Request, res: Response) => {
  try {
    const { name, address, phone } = req.body

    const editorial = await prisma.editorials.findUnique({
      where: {
        name: name,
      },
    })

    if (editorial) {
      return res.status(400).json({ message: 'Editorial already exists' })
    }

    const newEditorial = await prisma.editorials.create({
      data: {
        name,
        address,
        phone,
      },
    })
    res
      .status(201)
      .json({ message: 'Editorial created', editorial: newEditorial })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const updateEditorial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, address, phone } = req.body

    const editorial = await prisma.editorials.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!editorial) {
      return res.status(404).json({ message: 'Editorial not found' })
    }

    const updatedEditorial = await prisma.editorials.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        address,
        phone,
      },
    })
    res
      .status(200)
      .json({ message: 'Editorial updated', editorial: updatedEditorial })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}
