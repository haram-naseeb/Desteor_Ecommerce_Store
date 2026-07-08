/**
 * routes/index.js
 *
 * Aggregates all feature routers into one. app.js mounts this single
 * router under /api — future feature routers (auth, products, orders...)
 * get registered here, not directly in app.js.
 */

const express = require('express');
const healthRoutes = require('./health.routes');

const router = express.Router();

router.use('/health', healthRoutes);

module.exports = router;
