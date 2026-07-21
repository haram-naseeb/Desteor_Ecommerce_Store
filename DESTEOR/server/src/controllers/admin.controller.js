const adminService = require('../services/admin.service');
function respond(handler, key, statusCode = 200, message) { return async (req, res, next) => { try { const data = await handler(req); res.status(statusCode).json({ success: true, data: key ? { [key]: data } : data, ...(message && { message }) }); } catch (error) { next(error); } }; }
const dashboard = respond(() => adminService.getDashboard());
const products = respond((req) => adminService.getProducts(req.query));
const product = respond((req) => adminService.getProduct(req.params.id), 'product');
const createProduct = respond((req) => adminService.createProduct(req.body), 'product', 201, 'Product created successfully.');
const updateProduct = respond((req) => adminService.updateProduct(req.params.id, req.body), 'product', 200, 'Product updated successfully.');
const deleteProduct = respond(async (req) => { await adminService.removeProduct(req.params.id); return null; }, null, 200, 'Product deleted successfully.');
const taxonomyList = (type) => respond(() => adminService.getTaxonomies(type), type === 'category' ? 'categories' : 'collections');
const taxonomyCreate = (type) => respond((req) => adminService.createTaxonomy(type, req.body), type, 201, `${type} created successfully.`);
const taxonomyUpdate = (type) => respond((req) => adminService.updateTaxonomy(type, req.params.id, req.body), type, 200, `${type} updated successfully.`);
const taxonomyDelete = (type) => respond(async (req) => { await adminService.removeTaxonomy(type, req.params.id); return null; }, null, 200, `${type} deleted successfully.`);
const orders = respond((req) => adminService.getOrders(req.query));
const order = respond((req) => adminService.getOrder(req.params.id), 'order');
const updateOrderStatus = respond((req) => adminService.changeOrderStatus(req.params.id, req.body.status), 'order', 200, 'Order status updated successfully.');
const users = respond((req) => adminService.getUsers(req.query));
const updateUserRole = respond((req) => adminService.changeUserRole(req.user.id, req.params.id, req.body.role), 'user', 200, 'User role updated successfully.');
const deleteUser = respond(async (req) => { await adminService.removeUser(req.user.id, req.params.id); return null; }, null, 200, 'User deleted successfully.');
const updateProfile = respond((req) => adminService.updateProfile(req.user.id, req.body), 'user', 200, 'Profile updated successfully.');
const reviews = respond(() => require('../services/review.service').getAdminReviews(), 'reviews');
const deleteReview = respond(async (req) => { await require('../services/review.service').removeReviewByAdmin(req.params.id); return null; }, null, 200, 'Review deleted successfully.');
async function upload(req, res, next) { try { const images = await require('../services/media.service').uploadImages(req.files); res.status(201).json({ success: true, data: { images }, message: 'Images uploaded successfully.' }); } catch (error) { next(error); } }
async function deleteUpload(req, res, next) { try { await require('../services/media.service').deleteImage(req.body.publicId); res.status(200).json({ success: true, data: null, message: 'Image deleted successfully.' }); } catch (error) { next(error); } }
module.exports = { dashboard, products, product, createProduct, updateProduct, deleteProduct, categories: taxonomyList('category'), createCategory: taxonomyCreate('category'), updateCategory: taxonomyUpdate('category'), deleteCategory: taxonomyDelete('category'), collections: taxonomyList('collection'), createCollection: taxonomyCreate('collection'), updateCollection: taxonomyUpdate('collection'), deleteCollection: taxonomyDelete('collection'), orders, order, updateOrderStatus, users, updateUserRole, deleteUser, updateProfile, reviews, deleteReview, upload, deleteUpload };
