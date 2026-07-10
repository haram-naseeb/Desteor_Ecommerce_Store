const express = require('express');

const cartController = require('../controllers/cart.controller');
const { protect } = require('../middleware/auth.middleware');
const {
  validateAddCartItem,
  validateUpdateCartItem,
} = require('../validators/cart.validator');

const router = express.Router();

router.use(protect);

router.get('/', cartController.getCart);
router.post('/items', validateAddCartItem, cartController.addItem);
router.patch('/items/:id', validateUpdateCartItem, cartController.updateItem);
router.delete('/items/:id', cartController.removeItem);
router.delete('/clear', cartController.clearCart);

module.exports = router;
