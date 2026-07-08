const { findUserById } = require('../repositories/auth.repository');
const { verifyAccessToken } = require('../utils/jwt');

async function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is required.',
      });
    }

    const payload = verifyAccessToken(token);
    const user = await findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User session is no longer valid.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
  console.error(error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.',
    });
  }
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource.',
      });
    }

    next();
  };
}

module.exports = {
  protect,
  requireRole,
};
