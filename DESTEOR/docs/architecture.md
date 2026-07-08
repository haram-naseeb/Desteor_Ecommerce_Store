# DESTEOR — Architecture

## Overview

DESTEOR follows a **headless architecture**. The `client` (React) and `server` (Express) are independent applications. They share no code, no build process, and no runtime. They communicate exclusively through a documented REST API over HTTP.

This separation means either side can be replaced or extended independently — for example, a future mobile app or a different frontend framework could consume the same backend without any server-side changes.

---

## Backend Layering

Every backend request follows a strict, one-directional flow:

```
Route → Controller → Service → Repository → Prisma → PostgreSQL
```

| Layer | Responsibility |
|---|---|
| **Route** | Maps an HTTP method + path to a controller function. No logic. |
| **Controller** | Parses the request, calls the appropriate service, shapes the HTTP response. No business logic, no direct database access. |
| **Service** | Contains all business logic and rules. Orchestrates one or more repositories. Framework-agnostic — knows nothing about HTTP. |
| **Repository** | The only layer that talks to Prisma. Encapsulates all database queries for a given model/domain. |
| **Prisma** | Type-safe database client and schema/migration tool. |

**Rule:** Controllers never contain business logic. Services never touch `req`/`res`. Only repositories import the Prisma client.

---

## Frontend Structure

| Folder | Responsibility |
|---|---|
| `components/ui/` | Purely presentational, reusable components (Button, Card, Modal, etc.) with no business logic and no knowledge of specific features. |
| `layouts/` | Page shells (`MainLayout`, `AuthLayout`, `AdminLayout`) that define consistent structure per section of the app. |
| `config/` | Centralized configuration: API client instance, theme tokens. |
| `constants/` | Shared, static values used across the app (routes, roles, etc.). |

Pages (added in later sprints) compose layouts + UI components + feature-specific logic. They are the only layer allowed to know about specific business features.

---

## Communication Contract

- All communication is REST over HTTPS, JSON in and out.
- The frontend uses a single, centrally configured Axios instance (`client/src/config/api.js`) — no component calls Axios directly with a hardcoded URL.
- The backend exposes versioned, documented endpoints (see [`api.md`](./api.md)).

---

## Why This Structure Scales

- **Business logic is centralized in services**, so new consumers of the same data (e.g. an admin dashboard, an AI recommendation engine) reuse existing services/repositories instead of duplicating queries.
- **UI components carry no business logic**, so the entire storefront and admin panel can be built from the same visual vocabulary.
- **Configuration is centralized**, so environment or branding changes happen in one place, not scattered across the codebase.

This document will be updated as new architectural decisions are made in future sprints.
