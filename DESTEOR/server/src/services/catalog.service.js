const catalogRepository = require('../repositories/catalog.repository');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 48;

const SORT_OPTIONS = {
  featured: [{ featured: 'desc' }, { bestSeller: 'desc' }, { createdAt: 'desc' }],
  newest: [{ createdAt: 'desc' }],
  'price-low': [{ salePrice: 'asc' }, { price: 'asc' }],
  'price-high': [{ salePrice: 'desc' }, { price: 'desc' }],
  name: [{ name: 'asc' }],
};

function toPositiveInteger(value, fallback, max = Number.MAX_SAFE_INTEGER) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

function mapProduct(product) {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    salePrice: product.salePrice,
    stock: product.stock,
    featured: product.featured,
    bestSeller: product.bestSeller,
    category: product.category,
    collection: product.collection,
    images: product.images,
    specifications: product.specifications,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function mapTaxonomy(record) {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    description: record.description,
    image: record.image,
    productCount: record._count?.products ?? 0,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

function createProductWhere(query, overrides = {}) {
  const where = {
    ...overrides,
  };

  if (query.search) {
    const search = query.search.trim();
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { category: { name: { contains: search, mode: 'insensitive' } } },
      { collection: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }

  if (query.category) {
    where.category = {
      ...(where.category || {}),
      slug: query.category,
    };
  }

  if (query.collection) {
    where.collection = {
      ...(where.collection || {}),
      slug: query.collection,
    };
  }

  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice) where.price.gte = Number(query.minPrice);
    if (query.maxPrice) where.price.lte = Number(query.maxPrice);
  }

  return where;
}

function createPagination(query) {
  const page = toPositiveInteger(query.page, DEFAULT_PAGE);
  const limit = toPositiveInteger(query.limit, DEFAULT_LIMIT, MAX_LIMIT);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

function createMeta({ total, page, limit }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

async function getProducts(query = {}) {
  const { page, limit, skip } = createPagination(query);
  const where = createProductWhere(query);
  const orderBy = SORT_OPTIONS[query.sort] || SORT_OPTIONS.featured;
  const [total, products] = await catalogRepository.findProducts({
    where,
    orderBy,
    skip,
    take: limit,
  });

  return {
    products: products.map(mapProduct),
    meta: createMeta({ total, page, limit }),
  };
}

async function getProductBySlug(slug) {
  const product = await catalogRepository.findProductBySlug(slug);

  if (!product) {
    const error = new Error('Product not found.');
    error.statusCode = 404;
    throw error;
  }

  const relatedProducts = await catalogRepository.findRelatedProducts({
    productId: product.id,
    categoryId: product.categoryId,
    limit: 3,
  });

  return {
    product: mapProduct(product),
    relatedProducts: relatedProducts.map(mapProduct),
  };
}

async function getFeaturedProducts(limitValue) {
  const limit = toPositiveInteger(limitValue, 8, MAX_LIMIT);
  const products = await catalogRepository.findFeaturedProducts(limit);

  return products.map(mapProduct);
}

async function getBestSellerProducts(limitValue) {
  const limit = toPositiveInteger(limitValue, 8, MAX_LIMIT);
  const products = await catalogRepository.findBestSellerProducts(limit);

  return products.map(mapProduct);
}

async function getCategories() {
  const categories = await catalogRepository.findCategories();
  return categories.map(mapTaxonomy);
}

async function getCollections() {
  const collections = await catalogRepository.findCollections();
  return collections.map(mapTaxonomy);
}

async function getCategoryProducts(slug, query = {}) {
  const category = await catalogRepository.findCategoryBySlug(slug);

  if (!category) {
    const error = new Error('Category not found.');
    error.statusCode = 404;
    throw error;
  }

  const { page, limit, skip } = createPagination(query);
  const where = createProductWhere(query, {
    category: { slug },
  });
  const orderBy = SORT_OPTIONS[query.sort] || SORT_OPTIONS.featured;
  const [total, products] = await catalogRepository.findProducts({
    where,
    orderBy,
    skip,
    take: limit,
  });

  return {
    category,
    products: products.map(mapProduct),
    meta: createMeta({ total, page, limit }),
  };
}

module.exports = {
  getBestSellerProducts,
  getCategories,
  getCategoryProducts,
  getCollections,
  getFeaturedProducts,
  getProductBySlug,
  getProducts,
};
