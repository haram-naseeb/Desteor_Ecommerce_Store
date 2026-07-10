import api from '@/services/api';

function normalizeOrder(order) {
  return {
    ...order,
    dateLabel: new Intl.DateTimeFormat('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(order.createdAt)),
  };
}

export async function checkout() {
  const response = await api.post('/orders/checkout');
  return normalizeOrder(response.data.data.order);
}

export async function getOrders() {
  const response = await api.get('/orders');
  return response.data.data.orders.map(normalizeOrder);
}

export async function getOrderById(orderId) {
  const response = await api.get(`/orders/${orderId}`);
  return normalizeOrder(response.data.data.order);
}
