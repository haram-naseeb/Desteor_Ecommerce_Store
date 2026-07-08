const prisma = require('../config/db');

const productInclude = {
  category: true,
  collection: true,
  images: {
    orderBy: { displayOrder: 'asc' },
  },
  specifications: {
    orderBy: { displayOrder: 'asc' },
  },
};

function findProducts({ where, orderBy, skip, take }) {
  return prisma.$transaction([
    prisma.product.count({ where }),
    prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      include: productInclude,
    }),
  ]);
}

function findProductBySlug(slug) {
  return prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });
}

function findFeaturedProducts(limit) {
  return prisma.product.findMany({
    where: {
      featured: true,
      stock: { gt: 0 },
    },
    orderBy: [{ bestSeller: 'desc' }, { createdAt: 'desc' }],
    take: limit,
    include: productInclude,
  });
}

function findBestSellerProducts(limit) {
  return prisma.product.findMany({
    where: {
      bestSeller: true,
      stock: { gt: 0 },
    },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    take: limit,
    include: productInclude,
  });
}

function findRelatedProducts({ productId, categoryId, limit }) {
  return prisma.product.findMany({
    where: {
      id: { not: productId },
      categoryId,
      stock: { gt: 0 },
    },
    orderBy: [{ bestSeller: 'desc' }, { createdAt: 'desc' }],
    take: limit,
    include: productInclude,
  });
}

function findCategories() {
  return prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

function findCategoryBySlug(slug) {
  return prisma.category.findUnique({
    where: { slug },
  });
}

function findCollections() {
  return prisma.collection.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

function findCollectionBySlug(slug) {
  return prisma.collection.findUnique({
    where: { slug },
  });
}

module.exports = {
  findBestSellerProducts,
  findCategories,
  findCategoryBySlug,
  findCollectionBySlug,
  findCollections,
  findFeaturedProducts,
  findProductBySlug,
  findProducts,
  findRelatedProducts,
  productInclude,
};
