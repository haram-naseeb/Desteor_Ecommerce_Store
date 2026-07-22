const orderService = require('../services/order.service');

async function checkout(req, res, next) {
  try {
    const order = await orderService.checkout(req.user?.id, req.body);

    res.status(201).json({
      success: true,
      data: { order },
      message: 'Order placed successfully.',
    });
  } catch (error) {
    next(error);
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await orderService.getOrders(req.user.id);

    res.status(200).json({
      success: true,
      data: { orders },
    });
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await orderService.getOrderById(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
}

async function cancelOrder(req, res, next) {
  try {
    const order = await orderService.cancelOrder(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      data: { order },
      message: 'Order cancelled successfully.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  cancelOrder,
  checkout,
  getOrderById,
  getOrders,
};
