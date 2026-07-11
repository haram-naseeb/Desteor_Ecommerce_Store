import api from '@/services/api';
import { normalizeProduct } from '@/services/product.service';

function normalizeWishlist(wishlist) {
  return { ...wishlist, items: (wishlist.items || []).map((item) => ({ ...item, product: normalizeProduct(item.product) })) };
}
export async function getWishlist() { const response = await api.get('/wishlist'); return normalizeWishlist(response.data.data.wishlist); }
export async function addWishlistItem(productId) { const response = await api.post('/wishlist/items', { productId }); return normalizeWishlist(response.data.data.wishlist); }
export async function removeWishlistItem(productId) { const response = await api.delete(`/wishlist/items/${productId}`); return normalizeWishlist(response.data.data.wishlist); }
