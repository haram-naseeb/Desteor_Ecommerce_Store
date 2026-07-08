import api from '@/services/api';

export async function getCollections() {
  const response = await api.get('/collections');
  return response.data.data.collections;
}
