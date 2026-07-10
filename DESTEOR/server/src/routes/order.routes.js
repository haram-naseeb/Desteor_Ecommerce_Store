const express = require('express');

const orderController = require('../controllers/order.controller');
const { protect } = require('../middleware/auth.middleware');
const {
  validateCheckout,
  validateOrderId,
} = require('../validators/order.validator');

const router = express.Router();

router.use(protect);

router.post('/checkout', validateCheckout, orderController.checkout);
router.get('/', orderController.getOrders);
router.get('/:id', validateOrderId, orderController.getOrderById);

module.exports = router;
