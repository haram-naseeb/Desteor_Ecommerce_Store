const router = require('express').Router();
const controller = require('../controllers/wishlist.controller');
const { protect } = require('../middleware/auth.middleware');
router.use(protect);
router.get('/', controller.getWishlist);
router.post('/items', controller.addToWishlist);
router.delete('/items/:productId', controller.removeFromWishlist);
module.exports = router;
