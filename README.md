# Red Rose Photo Booth LLC — MERN Website

A production-ready luxury photo booth website for **Red Rose Photo Booth LLC** in Sacramento, CA.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, GSAP, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose
- **Images:** Cloudinary
- **Email:** Nodemailer (Gmail App Password SMTP)
- **Auth:** JWT with HTTP-only cookies

## Project Structure

```
Roger/
├── frontend/          # React public site + admin portal
│   └── src/admin/     # Protected admin panel
└── backend/           # Express API only
```

## Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- Gmail account with App Password enabled

**Note:** Product and content images are stored in MongoDB (`StoredUpload` collection) via `/api/upload` — no disk writes. This works on serverless hosts (Vercel, Railway, etc.) where the filesystem is read-only.

### Image Upload API

| Endpoint | Auth | Description |
|----------|------|-------------|
| `POST /api/upload` | Admin | Upload image (`file`, `folder`: products\|gallery\|pages\|misc) |
| `DELETE /api/upload` | Admin | Delete by URL (`{ url }`) |
| `GET /api/uploads/:folder/:filename` | Public | Serve stored image binary |

Legacy `/uploads/...` disk URLs fall back to placeholder on the frontend.

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster.
2. Create a database user with read/write permissions.
3. Under **Network Access**, add your IP (or `0.0.0.0/0` for development).
4. Click **Connect** → **Drivers** and copy the connection string.
5. Replace `<password>` and set the database name:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/redrosephotobooth?retryWrites=true&w=majority
```

## Environment Configuration

### Backend (`backend/.env`)

Copy `backend/.env.example` to `backend/.env` and fill in:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your@gmail.com
SMTP_APP_PASSWORD=your_gmail_app_password
ADMIN_NOTIFICATION_EMAIL=Roger@redrosephotobooth.com
ADMIN_SEED_EMAIL=admin@redrosephotobooth.com
ADMIN_SEED_PASSWORD=ChangeThisPassword123!
```

### Frontend (`frontend/.env`)

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Never expose backend secrets in Vite environment variables.**

## Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account.
2. Go to Google Account → Security → App passwords.
3. Generate an app password for "Mail".
4. Use that password as `SMTP_APP_PASSWORD`.

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Copy Cloud Name, API Key, and API Secret to `backend/.env`.

## Installation & Development

### Backend

```bash
cd backend
npm install
npm run seed    # Creates admin account + initial data
npm run dev     # Starts API on http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev     # Starts site on http://localhost:5173
```

## Default Admin Credentials (after seed)

- **Email:** `admin@redrosephotobooth.com`
- **Password:** `ChangeThisPassword123!`

Change these immediately after first login.

## Admin Portal

Access at: `http://localhost:5173/admin/login`

Routes:
- `/admin/dashboard` — Stats and recent orders
- `/admin/products` — Product CRUD with Cloudinary uploads
- `/admin/services` — Service CRUD
- `/admin/orders` — Order and booking management
- `/admin/testimonials` — Testimonial CRUD

## Public Pages

| Route | Page |
|-------|------|
| `/` | Home with cinematic hero, shop preview, testimonials |
| `/services` | Dynamic services from MongoDB |
| `/testimonials` | Client reviews |
| `/pricing` | Custom quote information |
| `/shop` | Product catalog with cart |
| `/booking` | Multi-step booking form |
| `/blog` | Editorial blog (frontend data) |
| `/contact` | Contact form with map |

## Production Build & Deploy

The backend serves the built React app in production (single-server deploy on Railway, Render, VPS, etc.).

### 1. Configure production environment

**`backend/.env`** (copy from `backend/.env.example`):

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_long_random_secret_min_32_chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-production-domain.com
# SMTP + optional Cloudinary — see .env.example
```

**Frontend:** `frontend/.env.production` is already set for same-origin deploy:

```env
VITE_API_BASE_URL=/api
```

If the API runs on a **different domain**, set `VITE_API_BASE_URL=https://api.yourdomain.com/api` before building.

### 2. Install, seed, and build

From the project root:

```bash
npm run install:all
npm run seed          # first time only — creates admin + sample data
npm run build         # builds frontend/dist
```

### 3. Start production server

```bash
npm start
```

The site and API are available on the same port (default `5000`). Admin login: `https://your-domain.com/admin/login`.

### Separate frontend hosting (optional)

Deploy `frontend/dist` to Vercel/Netlify and set `VITE_API_BASE_URL` to your API URL at build time. Ensure `FRONTEND_URL` in backend `.env` matches the frontend URL for CORS.

### Production checklist

- [ ] Real `MONGODB_URI` in `backend/.env`
- [ ] Strong `JWT_SECRET` (32+ random characters)
- [ ] `FRONTEND_URL` matches your live domain
- [ ] Gmail SMTP credentials for contact/booking emails
- [ ] `npm run seed` completed (or admin created manually)
- [ ] Admin password changed after first login
- [ ] HTTPS enabled (required for secure cookies in production)

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/health` | Health check |
| `POST /api/auth/login` | Admin login |
| `GET /api/products` | List products |
| `GET /api/services` | List services |
| `GET /api/testimonials` | List testimonials |
| `POST /api/orders/product` | Submit product order |
| `POST /api/orders/booking` | Submit booking request |
| `POST /api/contact` | Contact form |

Protected admin routes require JWT cookie authentication.

## Business Information

- **Red Rose Photo Booth LLC**
- Roger Marionneaux — (916) 287-0870
- Roger@redrosephotobooth.com
- 2193 Raymar Way, Sacramento, CA 95835

## Payment Integration

Orders use a **Place Order Request** workflow with `pending` status. The order system is structured to add Stripe or another payment provider later without rebuilding the order model.

## License

Private — Red Rose Photo Booth LLC
