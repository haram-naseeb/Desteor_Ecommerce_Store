const SORT_OPTIONS = ['featured', 'newest', 'oldest', 'price-low', 'price-high', 'name', 'name-desc'];

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
  const { page, limit, minPrice, maxPrice, sort, inStock, featured, new: isNew } = req.query;
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
  for (const [key, value] of Object.entries({ inStock, featured, new: isNew })) if (value !== undefined && !['true', 'false'].includes(value)) errors[key] = 'Must be true or false.';

  if (Object.keys(errors).length) return sendValidationErrors(res, errors);
  next();
}

module.exports = {
  validateCatalogQuery,
};
