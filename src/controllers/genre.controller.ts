import { Request, Response } from 'express'
import prisma from '../client'

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await prisma.genres.findMany()
    res.status(200).json(genres)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body

    const genre = await prisma.genres.findUnique({
      where: {
        name: name,
      },
    })

    if (genre) {
      return res.status(400).json({
        message: 'Genre already exists!',
      })
    }

    await prisma.genres.create({
      data: {
        name,
      },
    })

    res.status(201).json({
      message: 'Genre created!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!',
    })
  }
}
