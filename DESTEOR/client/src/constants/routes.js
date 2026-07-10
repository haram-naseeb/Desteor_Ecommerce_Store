/**
 * constants/routes.js
 *
 * Single source of truth for route paths. Components should always
 * reference ROUTES.* rather than hardcoding path strings, so renaming
 * a route is a one-file change instead of a repo-wide search.
 *
 * No page components exist yet (Sprint 1) — these paths back the
 * layout-only route tree and will be used by real pages from Sprint 2.
 */

export const ROUTES = {
  HOME: '/',
  SHOP: '/shop',
  PRODUCT_DETAILS: '/shop/:slug',
  ABOUT: '/about',
  CONTACT: '/contact',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password/:token',
  },

  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    PRODUCTS: '/admin/products',
    ORDERS: '/admin/orders',
    CUSTOMERS: '/admin/customers',
    CATEGORIES: '/admin/categories',
    INVENTORY: '/admin/inventory',
    ANALYTICS: '/admin/analytics',
  },
};
