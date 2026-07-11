const service = require('../services/review.service');
const getReviews = (req, res, next) => service.getReviews(req.params.productId).then((data) => res.json({ success: true, data })).catch(next);
const createReview = (req, res, next) => service.createReview(req.user.id, req.params.productId, req.body).then((data) => res.status(201).json({ success: true, data })).catch(next);
const updateReview = (req, res, next) => service.updateReview(req.user.id, req.params.id, req.body).then((data) => res.json({ success: true, data })).catch(next);
const deleteReview = (req, res, next) => service.removeReview(req.user.id, req.params.id).then((data) => res.json({ success: true, data })).catch(next);
module.exports = { getReviews, createReview, updateReview, deleteReview };
