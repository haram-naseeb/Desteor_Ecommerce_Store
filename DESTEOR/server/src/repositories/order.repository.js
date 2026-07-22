const prisma = require('../config/db');

const orderInclude = {
  items: {
    orderBy: { createdAt: 'asc' },
    include: {
      product: {
        select: {
          slug: true,
        },
      },
    },
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
  // Neon connections can take longer than Prisma's default five-second
  // interactive transaction window. Checkout still runs atomically; this
  // simply gives its stock updates, order creation, and cart cleanup enough
  // time to complete under normal network latency.
  return prisma.$transaction(callback, {
    maxWait: 10_000,
    timeout: 20_000,
  });
}

function findCartForCheckout(userId, client = prisma) {
  return client.cart.findUnique({
    where: { userId },
    include: cartCheckoutInclude,
  });
}
function findProductsForCheckout(items, client = prisma) {
  return client.product.findMany({ where: { id: { in: items.map((item) => item.productId) } }, include: { images: { orderBy: { displayOrder: 'asc' }, take: 1 } } });
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

function findOrderForUser({ orderId, userId }, client = prisma) {
  return client.order.findFirst({
    where: {
      id: orderId,
      userId,
    },
    include: orderInclude,
  });
}

function cancelPendingOrder({ orderId, userId }, client = prisma) {
  return client.order.updateMany({
    where: { id: orderId, userId, status: 'PENDING' },
    data: { status: 'CANCELLED' },
  });
}

function restoreProductStock({ productId, quantity }, client = prisma) {
  return client.product.update({
    where: { id: productId },
    data: { stock: { increment: quantity } },
  });
}

module.exports = {
  cancelPendingOrder,
  clearCartItems,
  createOrder,
  decrementProductStock,
  findCartForCheckout,
  findProductsForCheckout,
  findOrderForUser,
  findOrderNumber,
  findOrdersByUserId,
  restoreProductStock,
  withTransaction,
};
