# DESTEOR - API Reference

**Base URL (development):** `http://localhost:5000/api`

This document is updated as each feature/sprint introduces new endpoints.

---

## Conventions

- All request/response bodies are JSON.
- All endpoints are prefixed with `/api`.
- Public storefront browsing endpoints do not require authentication.
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

Verifies the API server is running and the database is reachable.

**Response `200 OK`**
```json
{
  "success": true,
  "message": "DESTEOR API is running"
}
```

### Products

**`GET /api/products`**

Returns paginated products. Supports public browsing with query filters.

Query params:

| Param | Example | Notes |
|---|---|---|
| `page` | `1` | Positive integer. |
| `limit` | `12` | Positive integer, capped by the service. |
| `search` | `pearl` | Searches product, category, collection, and description. |
| `sort` | `price-low` | `featured`, `newest`, `price-low`, `price-high`, `name`. |
| `category` | `rings` | Category slug. |
| `collection` | `moonlit-vows` | Collection slug. |
| `minPrice` | `3000` | Non-negative number. |
| `maxPrice` | `12000` | Non-negative number. |

**Response `200 OK`**
```json
{
  "success": true,
  "data": {
    "products": [],
    "meta": {
      "total": 40,
      "page": 1,
      "limit": 12,
      "totalPages": 4,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

**`GET /api/products/featured?limit=4`**

Returns featured products.

**`GET /api/products/bestsellers?limit=4`**

Returns best-selling products.

**`GET /api/products/:slug`**

Returns one product plus related products from the same category.

### Categories

**`GET /api/categories`**

Returns all product categories with product counts.

**`GET /api/categories/:slug/products`**

Returns paginated products for one category. Supports the same query params as
`GET /api/products`, except the category is taken from the URL slug.

### Collections

**`GET /api/collections`**

Returns all product collections with product counts.

### Cart

All cart endpoints require an authenticated `Authorization: Bearer <token>`
header. Cart totals are calculated by the backend.

**`GET /api/cart`**

Returns the current user's cart, creating an empty cart if one does not exist.

**`POST /api/cart/items`**

Adds a product to the current user's cart. If the product already exists in the
cart, the quantity is increased on the existing row.

Request:

```json
{
  "productId": "product_id",
  "quantity": 1
}
```

**`PATCH /api/cart/items/:id`**

Updates a cart item quantity. Sending `0` removes the item.

Request:

```json
{
  "quantity": 2
}
```

**`DELETE /api/cart/items/:id`**

Removes one cart item.

**`DELETE /api/cart/clear`**

Removes all items from the current user's cart.

Cart response shape:

```json
{
  "success": true,
  "data": {
    "cart": {
      "id": "cart_id",
      "items": [],
      "summary": {
        "totalItems": 0,
        "subtotal": 0,
        "estimatedShipping": 0,
        "estimatedTax": 0,
        "estimatedTotal": 0
      }
    }
  }
}
```
