/**
 * config/db.js
 *
 * Single, shared Prisma Client instance.
 *
 * Repositories (Sprint 2+) should import `prisma` from this file rather
 * than instantiating their own PrismaClient. A fresh PrismaClient per file
 * opens a fresh connection pool per file — this singleton avoids that.
 */

const { PrismaClient } = require('@prisma/client');
const env = require('./env');

const prisma = new PrismaClient({
  log: env.isDevelopment() ? ['warn', 'error'] : ['error'],
});

module.exports = prisma;
