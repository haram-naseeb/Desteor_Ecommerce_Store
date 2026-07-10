/**
 * routes/index.js
 *
 * Aggregates all feature routers into one. app.js mounts this single
 * router under /api — future feature routers (auth, products, orders...)
 * get registered here, not directly in app.js.
 */

const express = require('express');
const authRoutes = require('./auth.routes');
const cartRoutes = require('./cart.routes');
const categoryRoutes = require('./category.routes');
const collectionRoutes = require('./collection.routes');
const healthRoutes = require('./health.routes');
const productRoutes = require('./product.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/collections', collectionRoutes);

module.exports = router;
