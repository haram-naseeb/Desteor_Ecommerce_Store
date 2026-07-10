const cartService = require('../services/cart.service');

async function getCart(req, res, next) {
  try {
    const cart = await cartService.getCart(req.user.id);

    res.status(200).json({
      success: true,
      data: { cart },
    });
  } catch (error) {
    next(error);
  }
}

async function addItem(req, res, next) {
  try {
    const cart = await cartService.addItem(req.user.id, req.body);

    res.status(201).json({
      success: true,
      data: { cart },
      message: 'Item added to cart.',
    });
  } catch (error) {
    next(error);
  }
}

async function updateItem(req, res, next) {
  try {
    const cart = await cartService.updateItem(req.user.id, req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: { cart },
      message: 'Cart item updated.',
    });
  } catch (error) {
    next(error);
  }
}

async function removeItem(req, res, next) {
  try {
    const cart = await cartService.removeItem(req.user.id, req.params.id);

    res.status(200).json({
      success: true,
      data: { cart },
      message: 'Cart item removed.',
    });
  } catch (error) {
    next(error);
  }
}

async function clearCart(req, res, next) {
  try {
    const cart = await cartService.clearCart(req.user.id);

    res.status(200).json({
      success: true,
      data: { cart },
      message: 'Cart cleared.',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addItem,
  clearCart,
  getCart,
  removeItem,
  updateItem,
};
