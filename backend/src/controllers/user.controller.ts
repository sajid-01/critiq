import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserReviews = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const reviews = await prisma.review.findMany({
      where: { userId: id },
      include: { book: true },
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch user reviews' });
  }
};
