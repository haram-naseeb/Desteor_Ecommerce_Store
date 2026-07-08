const express = require('express');

const catalogController = require('../controllers/catalog.controller');
const { validateCatalogQuery } = require('../validators/catalog.validator');

const router = express.Router();

router.get('/', validateCatalogQuery, catalogController.getProducts);
router.get('/featured', catalogController.getFeaturedProducts);
router.get('/bestsellers', catalogController.getBestSellerProducts);
router.get('/:slug', catalogController.getProductBySlug);

module.exports = router;
