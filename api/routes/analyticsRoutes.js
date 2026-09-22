import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { recordPageView, getAnalyticsSummary } from '../controllers/analyticsController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

const pageViewLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { success: false, message: 'Too many analytics requests.' },
});

router.post('/pageview', pageViewLimiter, recordPageView);
router.get('/summary', protect, getAnalyticsSummary);

export default router;
