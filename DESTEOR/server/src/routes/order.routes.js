const express = require('express');

const orderController = require('../controllers/order.controller');
const { protect, optionalProtect } = require('../middleware/auth.middleware');
const {
  validateCheckout,
  validateOrderId,
} = require('../validators/order.validator');

const router = express.Router();

router.post('/checkout', optionalProtect, validateCheckout, orderController.checkout);
router.use(protect);
router.get('/', orderController.getOrders);
router.get('/:id', validateOrderId, orderController.getOrderById);

module.exports = router;
