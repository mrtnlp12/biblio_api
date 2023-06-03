import { Request, Response } from 'express'
import prisma from '../client'

export const getBooks = async (req: Request, res: Response) => {
  const books = await prisma.books.findMany({
    orderBy: {
      title: 'asc',
    },
    where: {
      quantity: {
        gt: 0,
      },
    },
  })
  res.status(200).json(books)
}

export const getBook = async (req: Request, res: Response) => {
  const { id } = req.params
  const book = await prisma.books.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
      genre: true,
      editorial: true,
      area: true,
    },
  })
  res.status(200).json(book)
}

export const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      authorId,
      description,
      releaseDate,
      editorialId,
      ISBN,
      genreId,
      imageURL,
      areaId,
    } = req.body

    const book = await prisma.books.findUnique({
      where: {
        ISBN: ISBN,
      },
    })

    if (book) {
      return res.status(400).json({ message: 'Book already exists' })
    }

    const newBook = await prisma.books.create({
      data: {
        title,
        authorId: Number(authorId),
        description,
        releaseDate: new Date(releaseDate).toISOString(),
        editorialId: Number(editorialId),
        ISBN,
        genreId: Number(genreId),
        imageURL,
        areaId: Number(areaId),
      },
    })

    res.status(201).json({ message: 'Book created', book: newBook })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params
  const {
    title,
    authorId,
    description,
    releaseDate,
    editorialId,
    ISBN,
    quantity,
    genreId,
    imageURL,
    areaId,
  } = req.body

  const book = await prisma.books.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!book) {
    return res.status(400).json({ message: 'Book does not exist' })
  }

  const updatedBook = await prisma.books.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      authorId: Number(authorId),
      description,
      releaseDate: new Date(releaseDate).toISOString(),
      editorialId: Number(editorialId),
      ISBN,
      quantity: Number(quantity),
      genreId: Number(genreId),
      imageURL,
      areaId: Number(areaId),
    },
  })

  res.status(200).json({ message: 'Book updated', book: updatedBook })
}

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params
  const book = await prisma.books.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!book) {
    return res.status(400).json({ message: 'Book does not exist' })
  }

  await prisma.books.delete({
    where: {
      id: Number(id),
    },
  })

  res.status(200).json({ message: 'Book deleted' })
}
