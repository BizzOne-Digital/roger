import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  getOrders,
  getOrder,
  getOrderStats,
  createProductOrder,
  createBooking,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many requests. Please try again later.' },
});

router.get('/stats', protect, getOrderStats);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.post('/product', orderLimiter, createProductOrder);
router.post('/booking', orderLimiter, createBooking);
router.patch('/:id/status', protect, updateOrderStatus);

export default router;
