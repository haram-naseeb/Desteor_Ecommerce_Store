function sendValidationErrors(res, errors) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed.',
    errors,
  });
}

function validateCheckout(req, res, next) {
  const { customerName, phone, address, city, paymentMethod, items } = req.body || {};
  const errors = {};
  if (!customerName?.trim()) errors.customerName = 'Full name is required.';
  if (!phone?.trim()) errors.phone = 'Phone number is required.';
  if (!address?.trim()) errors.address = 'Complete address is required.';
  if (!city?.trim()) errors.city = 'City is required.';
  if (!['COD', 'ONLINE'].includes(paymentMethod)) errors.paymentMethod = 'Select a payment method.';
  if (!req.user && (!Array.isArray(items) || !items.length)) errors.items = 'Guest checkout requires at least one item.';
  return Object.keys(errors).length ? sendValidationErrors(res, errors) : next();
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
