function sendValidationErrors(res, errors) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed.',
    errors,
  });
}

function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) > 0;
}

function isNonNegativeInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 0;
}

function validateAddCartItem(req, res, next) {
  const errors = {};

  if (!req.body.productId || typeof req.body.productId !== 'string') {
    errors.productId = 'Product id is required.';
  }

  if (!isPositiveInteger(req.body.quantity)) {
    errors.quantity = 'Quantity must be a positive integer.';
  }

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);

  req.body.quantity = Number(req.body.quantity);
  next();
}

function validateUpdateCartItem(req, res, next) {
  const errors = {};

  if (!isNonNegativeInteger(req.body.quantity)) {
    errors.quantity = 'Quantity must be zero or a positive integer.';
  }

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);

  req.body.quantity = Number(req.body.quantity);
  next();
}

module.exports = {
  validateAddCartItem,
  validateUpdateCartItem,
};
