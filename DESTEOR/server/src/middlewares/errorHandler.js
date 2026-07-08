/**
 * middlewares/errorHandler.js
 *
 * The single centralized place errors are formatted and logged.
 * Controllers should never format error responses themselves —
 * they throw, or call next(err), and this middleware takes it from there.
 *
 * Must be registered LAST, after all routes and after notFound.
 */

const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode && err.statusCode >= 400 ? err.statusCode : 500;

  if (env.isDevelopment()) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(env.isDevelopment() && { stack: err.stack }),
  });
}

module.exports = errorHandler;
