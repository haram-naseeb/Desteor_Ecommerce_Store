/**
 * server.js
 *
 * Production entry point. Starts the HTTP server defined in src/app.js
 * and adds process-level safety nets so the server doesn't die silently
 * in production.
 */

const app = require('./src/app');
const env = require('./src/config/env');

const server = app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `DESTEOR API running in ${env.NODE_ENV} mode on http://localhost:${env.PORT}`
  );
});

// Prevent silent crashes from unhandled promise rejections.
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection:', reason);
  server.close(() => process.exit(1));
});

process.on('uncaughtException', (error) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Exception:', error);
  server.close(() => process.exit(1));
});
