const env = require('../config/env');
const authRepository = require('../repositories/auth.repository');
const {
  comparePassword,
  createSecureToken,
  hashPassword,
  hashToken,
} = require('../utils/hash');
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require('../utils/jwt');

function sanitizeUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    phone: user.phone,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function createAuthResponse(user, refreshToken) {
  return {
    user: sanitizeUser(user),
    accessToken: createAccessToken(user),
    refreshToken,
  };
}

async function register(payload) {
  const email = payload.email.trim().toLowerCase();
  const existingUser = await authRepository.findUserByEmail(email);

  if (existingUser) {
    const error = new Error('An account with this email already exists.');
    error.statusCode = 409;
    throw error;
  }

  const password = await hashPassword(payload.password);
  const user = await authRepository.createUser({
    firstName: payload.firstName.trim(),
    lastName: payload.lastName.trim(),
    email,
    password,
    phone: payload.phone?.trim() || null,
  });
  const refreshToken = createRefreshToken(user);
  await authRepository.updateUserPrivateFields(user.id, {
    refreshTokenHash: hashToken(refreshToken),
  });

  return createAuthResponse(user, refreshToken);
}

async function login({ email, password }) {
  const user = await authRepository.findUserByEmail(email.trim().toLowerCase());
  const isValidPassword = user
    ? await comparePassword(password, user.password)
    : false;

  if (!user || !isValidPassword) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const refreshToken = createRefreshToken(user);
  await authRepository.updateUserPrivateFields(user.id, {
    refreshTokenHash: hashToken(refreshToken),
  });

  return createAuthResponse(user, refreshToken);
}

async function logout(userId) {
  if (!userId) return;

  await authRepository.updateUserPrivateFields(userId, {
    refreshTokenHash: null,
  });
}

async function refresh(refreshToken) {
  if (!refreshToken) {
    const error = new Error('Refresh token is required.');
    error.statusCode = 401;
    throw error;
  }

  const payload = verifyRefreshToken(refreshToken);
  const user = await authRepository.findUserWithPrivateFieldsById(payload.sub);

  if (!user || user.refreshTokenHash !== hashToken(refreshToken)) {
    const error = new Error('Invalid refresh token.');
    error.statusCode = 401;
    throw error;
  }

  const nextRefreshToken = createRefreshToken(user);
  await authRepository.updateUserPrivateFields(user.id, {
    refreshTokenHash: hashToken(nextRefreshToken),
  });

  return createAuthResponse(user, nextRefreshToken);
}

async function forgotPassword(email) {
  const user = await authRepository.findUserByEmail(email.trim().toLowerCase());

  if (!user) {
    return {
      message:
        'If an account exists for this email, password reset instructions will be prepared.',
    };
  }

  const resetToken = createSecureToken();
  const resetPasswordTokenExpiry = new Date(
    Date.now() + env.RESET_TOKEN_EXPIRES_MINUTES * 60 * 1000
  );

  await authRepository.updateUserPrivateFields(user.id, {
    resetPasswordTokenHash: hashToken(resetToken),
    resetPasswordTokenExpiry,
  });

  return {
    message:
      'If an account exists for this email, password reset instructions will be prepared.',
    ...(env.isDevelopment() && { resetToken }),
  };
}

async function resetPassword(token, password) {
  const user = await authRepository.findUserByResetTokenHash(hashToken(token));

  if (!user) {
    const error = new Error('Reset token is invalid or expired.');
    error.statusCode = 400;
    throw error;
  }

  const nextPassword = await hashPassword(password);
  await authRepository.updateUserPrivateFields(user.id, {
    password: nextPassword,
    refreshTokenHash: null,
    resetPasswordTokenHash: null,
    resetPasswordTokenExpiry: null,
  });
}

async function getCurrentUser(userId) {
  const user = await authRepository.findUserById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  return user;
}

module.exports = {
  forgotPassword,
  getCurrentUser,
  login,
  logout,
  refresh,
  register,
  resetPassword,
};
