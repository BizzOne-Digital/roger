import { Router } from 'express';
import {
  uploadImage,
  serveUpload,
  deleteUpload,
} from '../controllers/uploadController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/', protect, upload.single('file'), uploadImage);
router.delete('/', protect, deleteUpload);
router.get('/:folder/:filename', serveUpload);

export default router;
