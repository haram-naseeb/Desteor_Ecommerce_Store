/**
 * middlewares/requestLogger.js
 *
 * Wraps morgan so app.js doesn't need to know logging internals or
 * care about environment branching — it just mounts this middleware.
 */

const morgan = require('morgan');
const env = require('../config/env');

// In production we skip verbose per-request logs here; a hosting
// platform's own request logs (Render) cover that, and this keeps
// production logs focused on warnings/errors from errorHandler.
const requestLogger = env.isDevelopment() ? morgan('dev') : (req, res, next) => next();

module.exports = requestLogger;
