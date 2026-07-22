const orderRepository = require('../repositories/order.repository');

const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING = 100;

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function getUnitPrice(product) {
  return product.salePrice || product.price;
}

function getProductImage(product) {
  return product.images?.[0]?.url || null;
}

function mapOrderItem(item) {
  return {
    id: item.id,
    productId: item.productId,
    productSlug: item.product?.slug || null,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    subtotal: item.unitPrice * item.quantity,
    productNameSnapshot: item.productNameSnapshot,
    productImageSnapshot: item.productImageSnapshot,
    subtotal: item.subtotal,
    createdAt: item.createdAt,
  };
}

function mapOrder(order) {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    customerName: order.customerName,
    phone: order.phone,
    address: order.address,
    city: order.city,
    postalCode: order.postalCode,
    notes: order.notes,
    paymentMethod: order.paymentMethod,
    subtotal: order.subtotal,
    shipping: order.shipping,
    total: order.total,
    items: order.items.map(mapOrderItem),
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
}

async function generateOrderNumber(client) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `DST-${datePart}-${randomPart}`;
    const existing = await orderRepository.findOrderNumber(orderNumber, client);

    if (!existing) return orderNumber;
  }

  throw createError('Unable to generate order number. Please try again.', 500);
}

function validateCartForCheckout(cart) {
  if (!cart || cart.items.length === 0) {
    throw createError('Your cart is empty.', 422);
  }

  for (const item of cart.items) {
    if (!item.product) {
      throw createError('A product in your cart is no longer available.', 422);
    }

    if (item.quantity > item.product.stock) {
      throw createError(
        `Only ${item.product.stock} pieces of ${item.product.name} are available.`,
        422
      );
    }
  }
}

async function checkout(userId, details) {
  return orderRepository.withTransaction(async (client) => {
    const cart = userId ? await orderRepository.findCartForCheckout(userId, client) : null;
    let checkoutItems = cart?.items;
    if (!userId) {
      const products = await orderRepository.findProductsForCheckout(details.items, client);
      const quantities = new Map(details.items.map((item) => [item.productId, Number(item.quantity) || 1]));
      checkoutItems = products.map((product) => ({ productId: product.id, quantity: quantities.get(product.id), product }));
      if (checkoutItems.length !== details.items.length) throw createError('One or more products are unavailable.', 422);
    }
    validateCartForCheckout({ items: checkoutItems });

    const orderItems = checkoutItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: getUnitPrice(item.product),
      productNameSnapshot: item.product.name,
      productImageSnapshot: getProductImage(item.product),
      subtotal: getUnitPrice(item.product) * item.quantity,
    }));
    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    const total = subtotal + shipping;
    const orderNumber = await generateOrderNumber(client);

    for (const item of checkoutItems) {
      const result = await orderRepository.decrementProductStock(
        { productId: item.productId, quantity: item.quantity },
        client
      );

      if (result.count !== 1) {
        throw createError(
          `${item.product.name} does not have enough stock available.`,
          422
        );
      }
    }

    const order = await orderRepository.createOrder(
      {
        order: {
          orderNumber,
          userId: userId || null,
          customerName: details.customerName.trim(), phone: details.phone.trim(), address: details.address.trim(), city: details.city.trim(),
          postalCode: details.postalCode?.trim() || null, notes: details.notes?.trim() || null, paymentMethod: details.paymentMethod,
          subtotal,
          shipping,
          total,
          status: 'PENDING',
        },
        items: orderItems,
      },
      client
    );

    if (cart) await orderRepository.clearCartItems(cart.id, client);
    return mapOrder(order);
  });
}

async function getOrders(userId) {
  const orders = await orderRepository.findOrdersByUserId(userId);
  return orders.map(mapOrder);
}

async function getOrderById(userId, orderId) {
  const order = await orderRepository.findOrderForUser({ orderId, userId });

  if (!order) {
    throw createError('Order not found.', 404);
  }

  return mapOrder(order);
}

async function cancelOrder(userId, orderId) {
  return orderRepository.withTransaction(async (client) => {
    const order = await orderRepository.findOrderForUser({ orderId, userId }, client);

    if (!order) {
      throw createError('Order not found.', 404);
    }

    const cancellation = await orderRepository.cancelPendingOrder({ orderId, userId }, client);
    if (cancellation.count !== 1) {
      throw createError('This order can no longer be cancelled because it has already been confirmed.', 409);
    }

    await Promise.all(
      order.items.map((item) => orderRepository.restoreProductStock({ productId: item.productId, quantity: item.quantity }, client))
    );

    return mapOrder({ ...order, status: 'CANCELLED', updatedAt: new Date() });
  });
}

module.exports = {
  cancelOrder,
  checkout,
  getOrderById,
  getOrders,
};
