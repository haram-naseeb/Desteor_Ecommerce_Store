const repository = require('../repositories/wishlist.repository');
function error(message, statusCode) { const value = new Error(message); value.statusCode = statusCode; return value; }
async function wishlistFor(userId) { return (await repository.findWishlist(userId)) || repository.createWishlist(userId); }
async function getWishlist(userId) { return wishlistFor(userId); }
async function addToWishlist(userId, productId) { if (!await repository.findProduct(productId)) throw error('Product not found.', 404); const wishlist = await wishlistFor(userId); try { await repository.addItem(wishlist.id, productId); } catch (cause) { if (cause.code !== 'P2002') throw cause; } return getWishlist(userId); }
async function removeFromWishlist(userId, productId) { const wishlist = await wishlistFor(userId); try { await repository.removeItem(wishlist.id, productId); } catch (cause) { if (cause.code !== 'P2025') throw cause; } return getWishlist(userId); }
module.exports = { getWishlist, addToWishlist, removeFromWishlist };
