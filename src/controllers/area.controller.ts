import { Request, Response } from 'express'
import prisma from '../client'

export const getAreas = async (req: Request, res: Response) => {
  try {
    const areas = await prisma.areas.findMany()
    res.status(200).json(areas)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export const createArea = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const area = await prisma.areas.findUnique({
      where: {
        name: name,
      },
    })

    if (area) {
      return res.status(400).json({
        message: 'Area already exists!',
      })
    }

    await prisma.areas.create({
      data: {
        name,
      },
    })

    res.status(201).json({
      message: 'Area created!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!',
    })
  }
}
