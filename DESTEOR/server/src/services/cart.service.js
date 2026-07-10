const cartRepository = require('../repositories/cart.repository');

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function getUnitPrice(product) {
  return product.salePrice || product.price;
}

function mapCartItem(item) {
  const unitPrice = getUnitPrice(item.product);
  const subtotal = unitPrice * item.quantity;

  return {
    id: item.id,
    quantity: item.quantity,
    unitPrice,
    subtotal,
    product: {
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      price: item.product.price,
      salePrice: item.product.salePrice,
      stock: item.product.stock,
      category: item.product.category,
      collection: item.product.collection,
      images: item.product.images || [],
    },
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

function mapCart(cart) {
  const items = cart.items.map(mapCartItem);
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    id: cart.id,
    userId: cart.userId,
    items,
    summary: {
      totalItems,
      subtotal,
      estimatedShipping: 0,
      estimatedTax: 0,
      estimatedTotal: subtotal,
    },
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
}

async function getOrCreateCart(userId) {
  const cart = await cartRepository.findCartByUserId(userId);
  if (cart) return cart;

  return cartRepository.createCart(userId);
}

async function getCart(userId) {
  const cart = await getOrCreateCart(userId);
  return mapCart(cart);
}

async function addItem(userId, { productId, quantity }) {
  const product = await cartRepository.findProductById(productId);

  if (!product) {
    throw createError('Product not found.', 404);
  }

  if (product.stock < 1) {
    throw createError('This product is currently out of stock.', 422);
  }

  const cart = await getOrCreateCart(userId);
  const existingItem = await cartRepository.findCartItemByProduct({
    cartId: cart.id,
    productId,
  });
  const nextQuantity = (existingItem?.quantity || 0) + quantity;

  if (nextQuantity > product.stock) {
    throw createError(`Only ${product.stock} pieces are available.`, 422);
  }

  if (existingItem) {
    await cartRepository.updateCartItemQuantity({
      itemId: existingItem.id,
      quantity: nextQuantity,
    });
  } else {
    await cartRepository.createCartItem({
      cartId: cart.id,
      productId,
      quantity,
    });
  }

  return getCart(userId);
}

async function updateItem(userId, itemId, { quantity }) {
  const item = await cartRepository.findCartItemForUser({ itemId, userId });

  if (!item) {
    throw createError('Cart item not found.', 404);
  }

  if (quantity === 0) {
    await cartRepository.deleteCartItem(itemId);
    return getCart(userId);
  }

  if (quantity > item.product.stock) {
    throw createError(`Only ${item.product.stock} pieces are available.`, 422);
  }

  await cartRepository.updateCartItemQuantity({ itemId, quantity });
  return getCart(userId);
}

async function removeItem(userId, itemId) {
  const item = await cartRepository.findCartItemForUser({ itemId, userId });

  if (!item) {
    throw createError('Cart item not found.', 404);
  }

  await cartRepository.deleteCartItem(itemId);
  return getCart(userId);
}

async function clearCart(userId) {
  const cart = await getOrCreateCart(userId);
  await cartRepository.clearCart(cart.id);
  return getCart(userId);
}

module.exports = {
  addItem,
  clearCart,
  getCart,
  removeItem,
  updateItem,
};
