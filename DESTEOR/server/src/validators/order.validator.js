function sendValidationErrors(res, errors) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed.',
    errors,
  });
}

function validateCheckout(req, res, next) {
  if (req.body && Object.keys(req.body).length > 0) {
    return sendValidationErrors(res, {
      body: 'Checkout does not accept request body fields yet.',
    });
  }

  next();
}

function validateOrderId(req, res, next) {
  if (!req.params.id || typeof req.params.id !== 'string') {
    return sendValidationErrors(res, {
      id: 'Order id is required.',
    });
  }

  next();
}

module.exports = {
  validateCheckout,
  validateOrderId,
};
