import api from '@/services/api';

export async function getCategories() {
  const response = await api.get('/categories');
  return response.data.data.categories;
}

export async function getCategoryProducts(slug, params = {}) {
  const response = await api.get(`/categories/${slug}/products`, { params });
  return response.data.data;
}
