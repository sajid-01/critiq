import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { userId: string };
}

// POST /api/reviews
export const createReview = async (req: AuthRequest, res: Response) => {
  const { rating, comment, bookId } = req.body;
  const userId = req.user?.userId;

  try {
    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        book: { connect: { id: bookId } },
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// GET /api/reviews/book/:bookId
export const getReviewsForBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const sortBy = req.query.sortBy as string;

  try {
    const reviews = await prisma.review.findMany({
      where: { bookId },
      include: { user: true },
      orderBy: sortBy === 'stars' ? { rating: 'desc' } : { createdAt: 'desc' },
    });

    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};
