/**
 * services/health.service.js
 *
 * Business logic for the health check, kept separate from the controller
 * so it stays framework-agnostic (no req/res) and consistent with the
 * Controller -> Service -> Repository pattern used everywhere else.
 */

const env = require('../config/env');

function getHealthStatus() {
  return {
    status: 'ok',
    environment: env.NODE_ENV,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };
}

module.exports = { getHealthStatus };
