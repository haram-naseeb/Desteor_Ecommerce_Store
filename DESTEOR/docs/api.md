# DESTEOR — API Reference

**Base URL (development):** `http://localhost:5000/api`

This document is updated as each feature/sprint introduces new endpoints. No business endpoints exist yet — Sprint 1 only introduces a health check to verify the server and database connection.

---

## Conventions

- All request/response bodies are JSON.
- All endpoints are prefixed with `/api`.
- Error responses follow a consistent shape:

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

- Success responses follow a consistent shape:

```json
{
  "success": true,
  "data": {}
}
```

---

## Endpoints

### Health Check

**`GET /api/health`**

Verifies the API server is running and (once connected) that the database is reachable.

**Response `200 OK`**
```json
{
  "success": true,
  "message": "DESTEOR API is running"
}
```

---

_Future sprints will document authentication, product, cart, order, and admin endpoints here._
