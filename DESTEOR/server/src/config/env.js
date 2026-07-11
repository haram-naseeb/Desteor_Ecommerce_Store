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
  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET || 'desteor-development-access-secret',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || 'desteor-development-refresh-secret',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  RESET_TOKEN_EXPIRES_MINUTES:
    parseInt(process.env.RESET_TOKEN_EXPIRES_MINUTES, 10) || 30,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

  isProduction: () => env.NODE_ENV === 'production',
  isDevelopment: () => env.NODE_ENV === 'development',
};

if (
  env.isProduction() &&
  (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET)
) {
  throw new Error(
    'JWT_ACCESS_SECRET and JWT_REFRESH_SECRET are required in production.'
  );
}

module.exports = env;
