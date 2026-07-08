const express = require('express');

const catalogController = require('../controllers/catalog.controller');
const { validateCatalogQuery } = require('../validators/catalog.validator');

const router = express.Router();

router.get('/', catalogController.getCategories);
router.get('/:slug/products', validateCatalogQuery, catalogController.getCategoryProducts);

module.exports = router;
