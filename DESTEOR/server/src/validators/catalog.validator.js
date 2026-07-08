const SORT_OPTIONS = ['featured', 'newest', 'price-low', 'price-high', 'name'];

function sendValidationErrors(res, errors) {
  return res.status(422).json({
    success: false,
    message: 'Validation failed.',
    errors,
  });
}

function isPositiveInteger(value) {
  if (value === undefined) return true;
  return /^\d+$/.test(String(value)) && Number(value) > 0;
}

function isNonNegativeNumber(value) {
  if (value === undefined) return true;
  return /^\d+(\.\d+)?$/.test(String(value)) && Number(value) >= 0;
}

function validateCatalogQuery(req, res, next) {
  const { page, limit, minPrice, maxPrice, sort } = req.query;
  const errors = {};

  if (!isPositiveInteger(page)) errors.page = 'Page must be a positive integer.';
  if (!isPositiveInteger(limit)) errors.limit = 'Limit must be a positive integer.';
  if (!isNonNegativeNumber(minPrice)) {
    errors.minPrice = 'Minimum price must be a non-negative number.';
  }
  if (!isNonNegativeNumber(maxPrice)) {
    errors.maxPrice = 'Maximum price must be a non-negative number.';
  }
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    errors.price = 'Minimum price cannot be greater than maximum price.';
  }
  if (sort && !SORT_OPTIONS.includes(sort)) {
    errors.sort = `Sort must be one of: ${SORT_OPTIONS.join(', ')}.`;
  }

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);
  next();
}

module.exports = {
  validateCatalogQuery,
};
