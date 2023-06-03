import { Request, Response } from 'express'
import prisma from '../client'

export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await prisma.loans.findMany({
      include: {
        book: true,
        user: true,
      },
      orderBy: {
        returnDate: 'asc',
      },
    })
    res.status(200).json(loans)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const generateLoan = async (req: Request, res: Response) => {
  try {
    const { bookId, returnDate, userId } = req.body

    const loan = await prisma.loans.create({
      data: {
        bookId: Number(bookId),
        returnDate: new Date(returnDate).toISOString(),
        userId,
      },
    })

    await prisma.books.update({
      where: {
        id: Number(bookId),
      },
      data: {
        quantity: {
          decrement: 1,
        },
      },
    })

    res.status(201).json({ message: 'Loan created', loan })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const deleteLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const loan = await prisma.loans.findUnique({
      where: {
        id: Number(id),
      },
    })

    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' })
    }

    await prisma.loans.delete({
      where: {
        id: Number(id),
      },
    })

    await prisma.books.update({
      where: {
        id: loan.bookId,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    })

    res.status(200).json({ message: 'Loan deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
