const prisma = require('../config/db');
const { productInclude } = require('./catalog.repository');

const wishlistInclude = { items: { orderBy: { createdAt: 'desc' }, include: { product: { include: productInclude } } } };
const findWishlist = (userId) => prisma.wishlist.findUnique({ where: { userId }, include: wishlistInclude });
const createWishlist = (userId) => prisma.wishlist.create({ data: { userId }, include: wishlistInclude });
const addItem = (wishlistId, productId) => prisma.wishlistItem.create({ data: { wishlistId, productId } });
const removeItem = (wishlistId, productId) => prisma.wishlistItem.delete({ where: { wishlistId_productId: { wishlistId, productId } } });
const findProduct = (id) => prisma.product.findUnique({ where: { id }, select: { id: true } });
module.exports = { findWishlist, createWishlist, addItem, removeItem, findProduct };
