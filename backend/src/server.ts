import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import reviewRoutes from './routes/review.routes';
import userRoutes from './routes/user.routes';

// Load environment variables
dotenv.config();

// Initialize Express and Prisma
const app: Application = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Critiq API is live!' });
});

// Routes (to be added later like authRoutes, bookRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Start Server
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
