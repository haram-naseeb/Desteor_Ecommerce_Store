const bcrypt = require('bcrypt');
const crypto = require('crypto');

const SALT_ROUNDS = 12;

function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function createSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = {
  comparePassword,
  createSecureToken,
  hashPassword,
  hashToken,
};
