import { Request, Response } from 'express'
import prisma from '../client'

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const { title } = req.query
    const books = await prisma.books.findMany({
      where: {
        title: {
          contains: String(title),
        },
        quantity: {
          gt: 0,
        },
      },
      orderBy: {
        title: 'asc',
      },
    })
    res.status(200).json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error',
    })
  }
}
