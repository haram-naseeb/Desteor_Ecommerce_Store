/**
 * controllers/health.controller.js
 *
 * Thin HTTP layer: parses the request, delegates to the service,
 * shapes the response. No business logic lives here.
 */

const { getHealthStatus } = require('../services/health.service');

function checkHealth(req, res) {
  const health = getHealthStatus();

  res.status(200).json({
    success: true,
    data: health,
  });
}

module.exports = { checkHealth };
