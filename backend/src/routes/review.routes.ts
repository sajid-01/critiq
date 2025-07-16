import { Router } from 'express';
import { createReview, getReviewsForBook } from '../controllers/review.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/', protect, createReview);
router.get('/book/:bookId', getReviewsForBook);

export default router;
