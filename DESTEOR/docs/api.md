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

### Orders

All order endpoints require an authenticated `Authorization: Bearer <token>`
header. Customers can only access their own orders.

**`POST /api/orders/checkout`**

Creates an order from the authenticated user's current cart.

Checkout behavior:

- Verifies the cart is not empty.
- Verifies every product still exists and has sufficient stock.
- Calculates subtotal from current backend product prices.
- Applies shipping: free at `PKR 5,000+`, otherwise `PKR 100`.
- Creates an order with status `PENDING`.
- Creates snapshot order items.
- Reduces product stock.
- Clears the cart.

**Response `201 Created`**

```json
{
  "success": true,
  "data": {
    "order": {
      "id": "order_id",
      "orderNumber": "DST-20260710-1234",
      "status": "PENDING",
      "subtotal": 5200,
      "shipping": 0,
      "total": 5200,
      "items": []
    }
  },
  "message": "Order placed successfully."
}
```

**`GET /api/orders`**

Returns the authenticated user's orders, newest first.

**`GET /api/orders/:id`**

Returns one order if it belongs to the authenticated user.
# Sprint 7A: Admin API

## Sprint 7B additions

- `POST /api/admin/upload` accepts up to eight JPEG, PNG, or WebP images in `images` multipart fields (5 MB each) and returns Cloudinary URLs and public IDs.
- `DELETE /api/admin/upload` removes a Cloudinary asset with `{ "publicId" }`.
- `GET /api/admin/users`, `PATCH /api/admin/users/:id/role`, and `DELETE /api/admin/users/:id` provide protected user management.
- `GET|PATCH /api/admin/profile` exposes the signed-in administrator profile. Password updates require at least eight characters.

Product, order, and user lists accept `page` and `limit`; product lists also accept search, taxonomy, featured, stock, and sort filters. Orders accept search, status, and date sort filters.

All admin endpoints require a valid bearer token for a user with the `ADMIN` role. A non-admin authenticated user receives `403`.

- `GET /api/admin/dashboard` — dashboard totals and order counts by status.
- `GET|POST /api/admin/products`, `GET|PUT|DELETE /api/admin/products/:id` — product administration, including Cloudinary-backed image records and specifications. Product images must first be uploaded through the protected multipart upload endpoint; the client never submits manually entered image URLs.
- `GET|POST /api/admin/categories`, `PUT|DELETE /api/admin/categories/:id` — category administration. Deletion returns `409` when products exist.
- `GET|POST /api/admin/collections`, `PUT|DELETE /api/admin/collections/:id` — collection administration. Deletion returns `409` when products exist.
- `GET /api/admin/orders`, `GET /api/admin/orders/:id`, `PATCH /api/admin/orders/:id/status` — order administration. Status changes only follow the fulfilment sequence; cancellation is allowed before delivery.

Requests retain the standard `{ success, data, message? }` response envelope. Invalid input returns `422` with an `errors` object.
# Sprint 8: Shopping Experience

## Wishlist

Authenticated wishlist endpoints are available under `/api/wishlist`:

- `GET /api/wishlist` returns the current customer's wishlist and normalized product records.
- `POST /api/wishlist/items` accepts `{ "productId": "..." }` and adds a product.
- `DELETE /api/wishlist/items/:productId` removes a product.

## Reviews

- `GET /api/products/:productId/reviews` returns `reviews`, `averageRating`, and `reviewCount`.
- `POST /api/products/:productId/reviews` creates the authenticated customer's review.
- `PATCH /api/products/reviews/:id` and `DELETE /api/products/reviews/:id` only allow the review owner.

## Catalog Query

`GET /api/products` supports `search`, `category`, `collection`, `minPrice`, `maxPrice`, `inStock`, `featured`, `new`, `sort`, `page`, and `limit`. Responses include pagination metadata: `total`, `page`, `limit`, `totalPages`, `hasNextPage`, and `hasPreviousPage`.
