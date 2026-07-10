const prisma = require('../config/db');

const cartInclude = {
  items: {
    orderBy: { createdAt: 'asc' },
    include: {
      product: {
        include: {
          category: true,
          collection: true,
          images: {
            orderBy: { displayOrder: 'asc' },
          },
        },
      },
    },
  },
};

function findCartByUserId(userId) {
  return prisma.cart.findUnique({
    where: { userId },
    include: cartInclude,
  });
}

function createCart(userId) {
  return prisma.cart.create({
    data: { userId },
    include: cartInclude,
  });
}

function findProductById(productId) {
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: {
        orderBy: { displayOrder: 'asc' },
      },
    },
  });
}

function findCartItemByProduct({ cartId, productId }) {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
    include: { product: true },
  });
}

function findCartItemForUser({ itemId, userId }) {
  return prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cart: { userId },
    },
    include: {
      product: true,
      cart: true,
    },
  });
}

function createCartItem({ cartId, productId, quantity }) {
  return prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity,
    },
  });
}

function updateCartItemQuantity({ itemId, quantity }) {
  return prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
}

function deleteCartItem(itemId) {
  return prisma.cartItem.delete({
    where: { id: itemId },
  });
}

function clearCart(cartId) {
  return prisma.cartItem.deleteMany({
    where: { cartId },
  });
}

module.exports = {
  cartInclude,
  clearCart,
  createCart,
  createCartItem,
  deleteCartItem,
  findCartByUserId,
  findCartItemByProduct,
  findCartItemForUser,
  findProductById,
  updateCartItemQuantity,
};
