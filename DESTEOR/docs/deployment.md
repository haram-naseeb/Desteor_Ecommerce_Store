# DESTEOR — Deployment Guide

## Target Platforms

| Component | Platform |
|---|---|
| Frontend (`client`) | Vercel |
| Backend (`server`) | Render |
| Database | Neon (PostgreSQL) |
| Image Storage | Cloudinary |

The stack is deliberately chosen so every component has a generous free tier and requires no server management. Avoid introducing any dependency or feature that cannot run on these platforms.

---

## Environment Variables

Each app manages its own environment variables — never share `.env` files between `client` and `server`, and never commit them to version control.

- `server/.env` — see `server/.env.example` for the full list.
- `client/.env` — see `client/.env.example` for the full list.

---

## Backend (Render)

1. Connect the GitHub repository to Render.
2. Set the root directory to `server`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `server/.env.example` in the Render dashboard.
6. Set the Neon PostgreSQL connection string as `DATABASE_URL`.

## Frontend (Vercel)

1. Connect the GitHub repository to Vercel.
2. Set the root directory to `client`.
3. Framework preset: Vite.
4. Add `VITE_API_BASE_URL` pointing to the deployed Render backend URL.

## Database (Neon)

1. Create a Neon PostgreSQL project.
2. Copy the connection string into `server/.env` as `DATABASE_URL`.
3. Run `npx prisma migrate deploy` (once models exist) as part of the deployment process.

---

_This guide will be expanded with CI/CD steps and rollback procedures in later sprints._
