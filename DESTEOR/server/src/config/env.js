/**
 * config/env.js
 *
 * Single source of truth for environment variables.
 *
 * Rules:
 * - Every environment variable the app depends on is read HERE, once.
 * - No other file should ever call `process.env.X` directly.
 * - If a required variable is missing, the app fails fast on startup
 *   with a clear error, instead of failing later inside a route.
 */

const dotenv = require('dotenv');

dotenv.config();

const REQUIRED_VARS = ['DATABASE_URL'];

function validateEnv() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        'Check your .env file against .env.example.'
    );
  }
}

validateEnv();

const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',

  isProduction: () => env.NODE_ENV === 'production',
  isDevelopment: () => env.NODE_ENV === 'development',
};

module.exports = env;
