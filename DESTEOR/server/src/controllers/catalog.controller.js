const catalogService = require('../services/catalog.service');

async function getProducts(req, res, next) {
  try {
    const data = await catalogService.getProducts(req.query);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function getProductBySlug(req, res, next) {
  try {
    const data = await catalogService.getProductBySlug(req.params.slug);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

async function getFeaturedProducts(req, res, next) {
  try {
    const products = await catalogService.getFeaturedProducts(req.query.limit);

    res.status(200).json({
      success: true,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
}

async function getBestSellerProducts(req, res, next) {
  try {
    const products = await catalogService.getBestSellerProducts(req.query.limit);

    res.status(200).json({
      success: true,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await catalogService.getCategories();

    res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
}

async function getCollections(req, res, next) {
  try {
    const collections = await catalogService.getCollections();

    res.status(200).json({
      success: true,
      data: { collections },
    });
  } catch (error) {
    next(error);
  }
}

async function getCategoryProducts(req, res, next) {
  try {
    const data = await catalogService.getCategoryProducts(req.params.slug, req.query);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getBestSellerProducts,
  getCategories,
  getCategoryProducts,
  getCollections,
  getFeaturedProducts,
  getProductBySlug,
  getProducts,
};
