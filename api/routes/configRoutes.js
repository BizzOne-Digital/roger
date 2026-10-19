import express from 'express';
import { resolvePublicBookingConfig } from '../utils/bookingUrls.js';

const router = express.Router();

router.get('/booking', (req, res) => {
  const { embedUrl, externalUrl } = resolvePublicBookingConfig();
  res.json({
    success: true,
    embedUrl,
    externalUrl,
  });
});

export default router;
