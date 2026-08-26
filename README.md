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
Roger/                 # Single project folder — one npm install
├── client/            # React public site + admin (Vite)
│   └── src/admin/     # Protected admin panel
├── api/               # Express API (routes, models, controllers)
├── scripts/           # Database seed
├── dist/              # Production build output (gitignored)
├── server.js          # Entry point
├── .env               # All secrets + config (one file)
└── package.json       # Unified dependencies & scripts
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

Copy `.env.example` to `.env` in the **project root** and fill in:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_long_random_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
VITE_API_BASE_URL=http://localhost:5000/api
# SMTP, Cloudinary, admin seed — see .env.example
```

**Never expose backend secrets in Vite env vars** — only `VITE_*` keys are for the frontend build.
## Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account.
2. Go to Google Account → Security → App passwords.
3. Generate an app password for "Mail".
4. Use that password as `SMTP_APP_PASSWORD`.

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. Copy Cloud Name, API Key, and API Secret to `.env`.

## Installation & Development

From the project root:

```bash
npm install
npm run seed    # Creates admin account + initial data (first time)
npm run dev     # API on http://localhost:5000
npm run dev:client   # Frontend on http://localhost:5173 (separate terminal)
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

### 1. Configure `.env` (project root)

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_long_random_secret_min_32_chars
FRONTEND_URL=https://your-production-domain.com
SERVE_FRONTEND=false   # if frontend is on Vercel separately
```

For **same-server** deploy, `.env.production` sets `VITE_API_BASE_URL=/api`. For **split** deploy, set `VITE_API_BASE_URL=https://your-api.vercel.app/api` in Vercel env.

### 2. Build and start

```bash
npm install
npm run seed    # first time only
npm run build   # outputs to dist/
npm start
```

### Vercel (split deploy from one repo)

| Project | Build command | Output | Env |
|---------|---------------|--------|-----|
| **Backend** | (uses `vercel.json` + `server.js`) | — | All `.env` vars except `VITE_*` |
| **Frontend** | `npm run build` | `dist` | `VITE_API_BASE_URL` |

### Production checklist

- [ ] Real `MONGODB_URI` in `.env`
- [ ] Strong `JWT_SECRET` (32+ characters)
- [ ] `FRONTEND_URL` matches live frontend URL (no trailing slash)
- [ ] Gmail SMTP configured
- [ ] `npm run seed` completed
- [ ] Admin password changed after first login
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
