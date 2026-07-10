import api from '@/services/api';

function normalizeCart(cart) {
  if (!cart) {
    return {
      id: null,
      items: [],
      summary: {
        totalItems: 0,
        subtotal: 0,
        estimatedShipping: 0,
        estimatedTax: 0,
        estimatedTotal: 0,
      },
    };
  }

  return {
    ...cart,
    items: cart.items.map((item) => ({
      ...item,
      product: {
        ...item.product,
        images: item.product.images?.map((image) => image.url) || [],
        categoryName: item.product.category?.name,
        collectionName: item.product.collection?.name,
      },
    })),
  };
}

export async function getCart() {
  const response = await api.get('/cart');
  return normalizeCart(response.data.data.cart);
}

export async function addCartItem(payload) {
  const response = await api.post('/cart/items', payload);
  return normalizeCart(response.data.data.cart);
}

export async function updateCartItem(itemId, payload) {
  const response = await api.patch(`/cart/items/${itemId}`, payload);
  return normalizeCart(response.data.data.cart);
}

export async function removeCartItem(itemId) {
  const response = await api.delete(`/cart/items/${itemId}`);
  return normalizeCart(response.data.data.cart);
}

export async function clearCart() {
  const response = await api.delete('/cart/clear');
  return normalizeCart(response.data.data.cart);
}
