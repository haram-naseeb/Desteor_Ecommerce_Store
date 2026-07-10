const prisma = require('../config/db');

const orderInclude = {
  items: {
    orderBy: { createdAt: 'asc' },
  },
};

const cartCheckoutInclude = {
  items: {
    orderBy: { createdAt: 'asc' },
    include: {
      product: {
        include: {
          images: {
            orderBy: { displayOrder: 'asc' },
            take: 1,
          },
        },
      },
    },
  },
};

function withTransaction(callback) {
  return prisma.$transaction(callback);
}

function findCartForCheckout(userId, client = prisma) {
  return client.cart.findUnique({
    where: { userId },
    include: cartCheckoutInclude,
  });
}

function findOrderNumber(orderNumber, client = prisma) {
  return client.order.findUnique({
    where: { orderNumber },
    select: { id: true },
  });
}

function createOrder({ order, items }, client = prisma) {
  return client.order.create({
    data: {
      ...order,
      items: {
        create: items,
      },
    },
    include: orderInclude,
  });
}

function decrementProductStock({ productId, quantity }, client = prisma) {
  return client.product.updateMany({
    where: {
      id: productId,
      stock: { gte: quantity },
    },
    data: {
      stock: { decrement: quantity },
    },
  });
}

function clearCartItems(cartId, client = prisma) {
  return client.cartItem.deleteMany({
    where: { cartId },
  });
}

function findOrdersByUserId(userId) {
  return prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: orderInclude,
  });
}

function findOrderForUser({ orderId, userId }) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: orderInclude,
  });
}

module.exports = {
  clearCartItems,
  createOrder,
  decrementProductStock,
  findCartForCheckout,
  findOrderForUser,
  findOrderNumber,
  findOrdersByUserId,
  withTransaction,
};
