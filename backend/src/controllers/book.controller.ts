import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        reviews: true,
      },
    });
    const booksWithRating = books.map((book) => {
      const ratings = book.reviews.map((r) => r.rating);
      const avgRating = ratings.length
        ? (ratings.reduce((acc, element) => acc + element,0) / ratings.length).toFixed(1)
        : null;
      return {
        ...book,
        averageRating: avgRating,
      };
    });

    res.status(200).json(booksWithRating);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// GET /api/books/:id
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { reviews: { include: { user: true } } }, // reviews with user info
    });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    const ratings = book.reviews.map((r) => r.rating);
    const avgRating = ratings.length
        ? (ratings.reduce((acc, element) => acc + element,0) / ratings.length).toFixed(1)
        : null;
    res.status(200).json({...book, averageRating : avgRating});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

// POST /api/admin/books
export const addBook = async (req: Request, res: Response) => {
  const { title, author, coverImage } = req.body;
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        coverImage,
      },
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};
