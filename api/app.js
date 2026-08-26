import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { sanitizeInput } from './middleware/sanitize.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, '../dist');const frontendIndexPath = path.join(frontendDistPath, 'index.html');
const hasFrontendBuild = fs.existsSync(frontendIndexPath);
const serveFrontend =
  process.env.SERVE_FRONTEND === 'true' ||
  (process.env.SERVE_FRONTEND !== 'false' && hasFrontendBuild);

const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
const app = express();
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(sanitizeInput);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Red Rose Photo Booth API is running' });
});

app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Red Rose Photo Booth API',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      services: '/api/services',
      testimonials: '/api/testimonials',
      contact: '/api/contact',
      auth: '/api/auth',
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/uploads', uploadRoutes);

if (serveFrontend) {
  app.use(express.static(frontendDistPath, {
    maxAge: '1d',
    index: false,
  }));

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(frontendIndexPath, (err) => {
      if (err) next(err);
    });
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Red Rose Photo Booth API (API-only mode)',
      frontend: frontendUrl,
      endpoints: {
        api: '/api',
        health: '/api/health',
        products: '/api/products',
        services: '/api/services',
        testimonials: '/api/testimonials',
        contact: '/api/contact',
        auth: '/api/auth',
      },
    });
  });
}
app.use(notFound);
app.use(errorHandler);

export default app;
