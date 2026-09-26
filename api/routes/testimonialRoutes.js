import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getTestimonials,
  submitPublicReview,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  approveTestimonial,
} from '../controllers/testimonialController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

const reviewSubmitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many review submissions. Please try again later.' },
});

router.get('/', getTestimonials);
router.post('/submit', reviewSubmitLimiter, upload.single('eventPhoto'), submitPublicReview);

router.patch('/:id/approve', protect, approveTestimonial);

router.post('/', protect, createTestimonial);
router.put('/:id', protect, updateTestimonial);
router.delete('/:id', protect, deleteTestimonial);

export default router;
