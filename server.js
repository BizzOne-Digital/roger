import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './api/config/db.js';
import app from './api/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'dist');

const start = async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is required. Set it in .env');
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is required. Set it in .env');
    process.exit(1);
  }

  if (isProduction && fs.existsSync(path.join(distPath, 'index.html'))) {
    console.log('Serving frontend from dist/');
  } else if (isProduction) {
    console.log('API-only mode — frontend hosted separately');
  }

  await connectDB();

  app.listen(PORT, () => {
    console.log(`Red Rose Photo Booth running on port ${PORT} (${isProduction ? 'production' : 'development'})`);
    if (!isProduction) {
      console.log(`API health: http://localhost:${PORT}/api/health`);
      console.log(`Frontend dev: http://localhost:5173`);
    }
  });
};

start();
