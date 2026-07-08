const express = require('express');

const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
} = require('../validators/auth.validator');

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', protect, authController.logout);
router.post('/refresh', authController.refresh);
router.get('/verify', protect, authController.verify);
router.post(
  '/forgot-password',
  validateForgotPassword,
  authController.forgotPassword
);
router.post(
  '/reset-password/:token',
  validateResetPassword,
  authController.resetPassword
);

module.exports = router;
