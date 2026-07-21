import api from '@/services/api';

export function normalizeProduct(product) {
  const images = product.images?.map((image) => image.url) || [];
  const specifications = product.specifications || [];

  return {
    ...product,
    images,
    specs: specifications.reduce((items, specification) => {
      items[specification.label] = specification.value;
      return items;
    }, {}),
    categoryName: product.category?.name,
    categorySlug: product.category?.slug,
    collectionName: product.collection?.name,
    collectionSlug: product.collection?.slug,
    category: product.category?.name,
    collection: product.collection?.name,
    averageRating: product.averageRating ?? 0,
    reviewCount: product.reviewCount ?? 0,
    badge: product.bestSeller ? 'Best Seller' : product.featured ? 'Featured' : '',
  };
}

function normalizeProductList(products) {
  return products.map(normalizeProduct);
}

export async function getProducts(params = {}) {
  const response = await api.get('/products', { params });

  return {
    products: normalizeProductList(response.data.data.products),
    meta: response.data.data.meta,
  };
}

export async function getProductBySlug(slug) {
  const response = await api.get(`/products/${slug}`);
  const { product, relatedProducts } = response.data.data;

  return {
    product: normalizeProduct(product),
    relatedProducts: normalizeProductList(relatedProducts),
  };
}

export async function getFeaturedProducts(limit = 8) {
  const response = await api.get('/products/featured', { params: { limit } });
  return normalizeProductList(response.data.data.products);
}

export async function getBestSellerProducts(limit = 8) {
  const response = await api.get('/products/bestsellers', { params: { limit } });
  return normalizeProductList(response.data.data.products);
}
