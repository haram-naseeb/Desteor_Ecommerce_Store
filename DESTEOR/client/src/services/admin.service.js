import api from '@/services/api';

export async function getAdminDashboard() {
  const response = await api.get('/admin/dashboard');
  return response.data.data;
}
export async function getAdminProducts(params) {
  const response = await api.get('/admin/products', { params });
  return response.data.data;
}
export async function saveAdminProduct(product) {
  const response = product.id
    ? await api.put(`/admin/products/${product.id}`, product)
    : await api.post('/admin/products', product);
  return response.data.data.product;
}
export async function deleteAdminProduct(id) {
  await api.delete(`/admin/products/${id}`);
}
export async function getAdminTaxonomies(type) {
  const response = await api.get(`/admin/${type}`);
  return response.data.data[`${type}`];
}
export async function saveAdminTaxonomy(type, record) {
  const response = record.id
    ? await api.put(`/admin/${type}/${record.id}`, record)
    : await api.post(`/admin/${type}`, record);
  return response.data.data[type.slice(0, -1)];
}
export async function deleteAdminTaxonomy(type, id) {
  await api.delete(`/admin/${type}/${id}`);
}
export async function getAdminOrders(params) {
  const response = await api.get('/admin/orders', { params });
  return response.data.data;
}
export async function updateAdminOrderStatus(id, status) {
  const response = await api.patch(`/admin/orders/${id}/status`, { status });
  return response.data.data.order;
}
export async function getAdminUsers(params) {
  const response = await api.get('/admin/users', { params });
  return response.data.data;
}
export async function updateAdminUserRole(id, role) {
  const response = await api.patch(`/admin/users/${id}/role`, { role });
  return response.data.data.user;
}
export async function deleteAdminUser(id) {
  await api.delete(`/admin/users/${id}`);
}
export async function uploadAdminImages(files) {
  const formData = new FormData();
  [...files].forEach((file) => formData.append('images', file));
  const response = await api.post('/admin/upload', formData);
  return response.data.data.images;
}
export async function deleteAdminUpload(publicId) {
  await api.delete('/admin/upload', { data: { publicId } });
}
