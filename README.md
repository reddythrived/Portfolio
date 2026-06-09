# K.P. Thrived Reddy — AI Engineer Portfolio

> A world-class, premium, recruiter-focused personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Prisma ORM, and Vercel Postgres.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/portfolio)

---

## ✨ Features

- **AI-themed dark design** — glassmorphism, aurora gradients, particle canvas animations, mouse-follow spotlight cards
- **Hero section** — full-screen with animated rotating titles and premium CTAs
- **Projects showcase** — 5 AI/ML & Full Stack projects with detailed sub-pages
- **Interactive skill matrix** — animated progress bars grouped by domain
- **Achievement timeline** — certifications, hackathons, workshops with filter tabs
- **Journey timeline** — academic and technical milestone progression
- **Animated statistics** — viewport-triggered counting animations
- **Contact form** — Server Action persistence to Postgres with validation
- **Resume viewer** — dedicated `/resume` route with embedded Google Drive preview + download
- **Admin dashboard** — protected CRUD for projects, skills, messages; visitor analytics
- **Visitor analytics** — IP-hashed privacy-first tracking by page, device, and country
- **Full SEO** — OpenGraph, Twitter cards, sitemap, robots.txt, structured metadata
- **Vercel Analytics** — built-in performance + traffic monitoring

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Auth | NextAuth.js (Credentials) |
| Database | Prisma ORM + Vercel Postgres |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── actions/portfolio.ts     # Server Actions (contact, CRUD, analytics)
│   ├── admin/
│   │   ├── login/page.tsx       # Admin login page
│   │   └── dashboard/           # Admin dashboard (server + client)
│   ├── api/auth/[...nextauth]/  # NextAuth handler
│   ├── projects/[id]/page.tsx   # Dynamic project detail pages
│   ├── resume/page.tsx          # Resume viewer page
│   ├── layout.tsx               # Root layout (SEO, fonts, providers)
│   ├── page.tsx                 # Home page (Server Component)
│   ├── sitemap.ts               # Dynamic sitemap
│   └── robots.ts                # Robots.txt
│
├── components/
│   ├── sections/                # Hero, About, Skills, Projects, Achievements...
│   └── ui/                     # Nav, Footer, SpotlightCard, CanvasParticles...
│
├── lib/
│   ├── auth.ts                  # NextAuth options
│   ├── db.ts                    # Prisma singleton
│   └── utils.ts                 # cn() class merge utility
│
prisma/
├── schema.prisma                # Database models
└── seed.ts                      # Seed script (projects, skills, achievements)
```

---

## ⚙️ Local Development Setup

### Prerequisites
- Node.js v20+
- PostgreSQL running locally **or** a Vercel Postgres connection string

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
npm install
```

### 2. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio?schema=public"
NEXTAUTH_SECRET="your-secret-key-at-least-32-chars"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="your-secure-password"
```

### 3. Database Setup

```bash
# Push schema to database
npx prisma db push

# Seed with default data (projects, skills, achievements, admin user)
npx prisma db seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Vercel Deployment

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "feat: initial portfolio"
git push origin main
```

### Step 2 — Create Vercel Project

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)

### Step 3 — Add Vercel Postgres

1. In your Vercel project → **Storage** → **Create Database** → **Postgres**
2. Connect it to your project — this auto-populates `DATABASE_URL`

### Step 4 — Set Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Auto-set by Vercel Postgres |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -hex 32` |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` |
| `ADMIN_EMAIL` | Your admin email |
| `ADMIN_PASSWORD` | Your secure password |

### Step 5 — Run Database Migrations

After first deployment, run from your local machine with production `DATABASE_URL`:

```bash
npx prisma db push
npx prisma db seed
```

Or add a **Post-Build** script in Vercel:
```
npx prisma db push && npx prisma db seed
```

### Step 6 — Deploy 🚀

Click **Deploy** — your portfolio will be live!

---

## 🔐 Admin Dashboard

Access the admin panel at `/admin/dashboard`

**Default Login** (change after seeding):
- Email: value of `ADMIN_EMAIL`
- Password: value of `ADMIN_PASSWORD`

### Admin Capabilities
- 📊 **Analytics** — page views, unique visitors, devices, countries
- 📬 **Messages** — view, mark read/unread, delete recruiter messages
- 🚀 **Projects** — add, edit, delete projects
- 🛠️ **Skills** — add, edit, delete skills

---

## 📄 Resume Integration

Resume URL: [Google Drive](https://drive.google.com/file/d/1c4_s1GxYOUvPlFHm-Qod98wi_-CXvlK8/view?usp=drivesdk)

Accessible from:
- `/resume` — dedicated full-page viewer
- Hero section CTA button
- Navbar link
- About section recruiter card
- Floating action button (appears on scroll)
- Footer link

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| SEO Score | 100 |
| Accessibility | 95+ |
| Best Practices | 100 |

---

## 📝 License

MIT — Feel free to customize for your own portfolio.

---

*Built with ❤️ for K.P. Thrived Reddy — AI & ML Engineer*
