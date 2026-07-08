/**
 * middlewares/notFound.js
 *
 * Catches any request that didn't match a route and converts it into
 * a 404 error, forwarding it to the centralized errorHandler.
 */

function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

module.exports = notFound;
