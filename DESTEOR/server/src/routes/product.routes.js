const express = require('express');

const catalogController = require('../controllers/catalog.controller');
const reviewController = require('../controllers/review.controller');
const { validateCatalogQuery } = require('../validators/catalog.validator');
const { validateReview } = require('../validators/review.validator');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', validateCatalogQuery, catalogController.getProducts);
router.get('/featured', catalogController.getFeaturedProducts);
router.get('/bestsellers', catalogController.getBestSellerProducts);
router.get('/:productId/reviews', reviewController.getReviews);
router.post('/:productId/reviews', protect, validateReview, reviewController.createReview);
router.patch('/reviews/:id', protect, validateReview, reviewController.updateReview);
router.delete('/reviews/:id', protect, reviewController.deleteReview);
router.get('/:slug', catalogController.getProductBySlug);

module.exports = router;
