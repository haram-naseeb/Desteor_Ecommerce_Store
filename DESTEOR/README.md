# DESTEOR

**Crafted for Your Destiny.**

DESTEOR is a premium, AI-powered bridal jewellery e-commerce platform. This is a production-oriented business platform — not a demo project — built with a headless architecture separating a React frontend from a Node.js/Express backend.

---

## Brand

- **Industry:** Premium Artificial Bridal Jewellery
- **Theme:** Luxury, Minimal, Elegant, Timeless
- **Colors:** Matte Black · Champagne Gold · Ivory White
- **Typography:** Cinzel (headings) · Poppins (body)

---

## Architecture

DESTEOR uses a **headless architecture**. The frontend and backend are fully independent applications that communicate exclusively over a REST API.

```
DESTEOR/
├── client/     React 19 + Vite + Tailwind CSS storefront & admin UI
├── server/     Express + Prisma + PostgreSQL API
└── docs/       Architecture, API, and deployment documentation
```

Backend requests flow through a strict layered structure:

```
Controller → Service → Repository → Prisma
```

Business logic never lives in controllers. See [`docs/architecture.md`](./docs/architecture.md) for details.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Framer Motion |
| Backend | Node.js, Express.js, Prisma ORM |
| Database | PostgreSQL (Neon) |
| Auth | JWT, bcrypt (refresh tokens planned) |
| Storage | Cloudinary |
| Email | Resend |
| Deployment | Vercel (frontend) · Render (backend) · Neon (database) |
| AI (future) | Gemini API, LangChain, RAG, Agentic AI |

---

## Getting Started

### Prerequisites
- Node.js (LTS)
- npm
- A PostgreSQL connection string (Neon recommended)

### Backend

```bash
cd server
cp .env.example .env   # fill in your own values
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Documentation

- [Architecture](./docs/architecture.md)
- [API Reference](./docs/api.md)
- [Deployment Guide](./docs/deployment.md)

---

## Git Conventions

Use meaningful, conventional commit messages:

```
feat(auth): implement JWT login
fix(cart): correct quantity calculation
refactor(products): extract product service
```

Avoid vague commits such as `final`, `latest`, `working`, `done`.

---

## Project Status

**Current Sprint:** Sprint 1 — Project Foundation ✅

- ✅ Root setup (docs, git conventions)
- ✅ Backend foundation (Express, Prisma config, `/api/health`, error handling, env config)
- ✅ Frontend foundation (Vite, Tailwind, Router, Layouts, 8 reusable UI components)

No pages, authentication, or database models exist yet — those begin in Sprint 2. See [`docs/architecture.md`](./docs/architecture.md) for the full frontend and backend architecture.

### Frontend Structure

```
client/src/
├── assets/            static assets (logo, images)
├── components/ui/     Button, Input, Card, Modal, Loader, Container, Section, Typography
├── config/             api.js (Axios instance), theme.js (brand tokens)
├── constants/          routes.js, app.js
├── hooks/               reusable custom hooks (empty, reserved)
├── layouts/             MainLayout, AuthLayout, AdminLayout
├── router/               centralized route tree
├── utils/                pure helper functions (empty, reserved)
├── App.jsx
└── main.jsx
```

Import alias `@/` maps to `client/src/` (configured in `vite.config.js` and mirrored in `jsconfig.json`).
