import api from '@/services/api';
export async function getReviews(productId) { const response = await api.get(`/products/${productId}/reviews`); return response.data.data; }
export async function createReview(productId, payload) { const response = await api.post(`/products/${productId}/reviews`, payload); return response.data.data; }
export async function updateReview(id, payload) { const response = await api.patch(`/products/reviews/${id}`, payload); return response.data.data; }
export async function deleteReview(id) { const response = await api.delete(`/products/reviews/${id}`); return response.data.data; }
