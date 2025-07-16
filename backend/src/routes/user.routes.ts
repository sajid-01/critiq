import { Router } from 'express';
import { getUserReviews } from '../controllers/user.controller';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/:id/reviews', protect, getUserReviews);

export default router;
