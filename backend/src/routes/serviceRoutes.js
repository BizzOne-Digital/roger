import { Router } from 'express';
import {
  getServices,
  getService,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);
router.get('/:id', getService);

router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

export default router;
