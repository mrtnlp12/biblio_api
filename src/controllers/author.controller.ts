import { Request, Response } from 'express'
import prisma from '../client'

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.authors.findMany()

    res.status(200).json(authors)
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error!',
    })
  }
}

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, lastname } = req.body

    const author = await prisma.authors.findUnique({
      where: {
        name: name,
      },
    })

    if (author) {
      return res.status(400).json({
        message: 'Author already exists!',
      })
    }

    await prisma.authors.create({
      data: {
        name,
        lastname,
      },
    })

    res.status(201).json({
      message: 'Author created!',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!',
    })
  }
}
