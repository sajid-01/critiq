import { Router } from 'express';
import { getAllBooks, getBookById, addBook } from '../controllers/book.controller';
import { protect } from '../middleware/authMiddleware';
import { isAdmin } from '../middleware/isAdmin';

const router = Router();

// Public
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Protected (admin logic can be added later) ------------ > it is now added isAdmin
router.post('/admin/books', protect, isAdmin, addBook);

export default router;
