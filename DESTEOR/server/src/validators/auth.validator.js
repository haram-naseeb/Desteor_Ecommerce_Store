const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RULES = [
  {
    test: (value) => value.length >= 8,
    message: 'Password must be at least 8 characters long.',
  },
];

function sendValidationErrors(res, errors) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed.',
    errors,
  });
}

function validatePassword(password) {
  return PASSWORD_RULES.filter((rule) => !rule.test(password)).map(
    (rule) => rule.message
  );
}

function validateRegister(req, res, next) {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const errors = {};

  if (!firstName?.trim()) errors.firstName = 'First name is required.';
  if (!lastName?.trim()) errors.lastName = 'Last name is required.';
  if (!email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!password) {
    errors.password = ['Password is required.'];
  } else {
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length) errors.password = passwordErrors;
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);
  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = {};

  if (!email?.trim()) errors.email = 'Email is required.';
  if (!password) errors.password = 'Password is required.';

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);
  next();
}

function validateForgotPassword(req, res, next) {
  const { email } = req.body;
  const errors = {};

  if (!email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);
  next();
}

function validateResetPassword(req, res, next) {
  const { password, confirmPassword } = req.body;
  const errors = {};

  if (!password) {
    errors.password = ['Password is required.'];
  } else {
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length) errors.password = passwordErrors;
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Confirm password is required.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);
  next();
}

module.exports = {
  validateForgotPassword,
  validateLogin,
  validateRegister,
  validateResetPassword,
};
