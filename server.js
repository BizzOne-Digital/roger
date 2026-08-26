import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './api/config/db.js';
import app from './api/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '.env') });

export default app;

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  const start = async () => {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is required. Set it in .env');
      process.exit(1);
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is required. Set it in .env');
      process.exit(1);
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Red Rose Photo Booth running on http://localhost:${PORT}`);
      console.log(`Frontend dev: npm run dev:client → http://localhost:5173`);
    });
  };

  start();
}
