const service = require('../services/wishlist.service');
async function respond(res, handler) { const wishlist = await handler(); res.status(200).json({ success: true, data: { wishlist } }); }
const getWishlist = (req, res, next) => respond(res, () => service.getWishlist(req.user.id)).catch(next);
const addToWishlist = (req, res, next) => respond(res, () => service.addToWishlist(req.user.id, req.body.productId)).catch(next);
const removeFromWishlist = (req, res, next) => respond(res, () => service.removeFromWishlist(req.user.id, req.params.productId)).catch(next);
module.exports = { getWishlist, addToWishlist, removeFromWishlist };
