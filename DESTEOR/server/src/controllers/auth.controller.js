const authService = require('../services/auth.service');

async function register(req, res, next) {
  try {
    const data = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const data = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await authService.logout(req.user?.id);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const data = await authService.refresh(req.body.refreshToken);

    res.status(200).json({
      success: true,
      message: 'Session refreshed.',
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function verify(req, res, next) {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const data = await authService.forgotPassword(req.body.email);

    res.status(200).json({
      success: true,
      message: data.message,
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function resetPassword(req, res, next) {
  try {
    await authService.resetPassword(req.params.token, req.body.password);

    res.status(200).json({
      success: true,
      message: 'Password reset successfully.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  forgotPassword,
  login,
  logout,
  refresh,
  register,
  resetPassword,
  verify,
};
