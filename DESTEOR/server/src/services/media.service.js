const { cloudinary, isConfigured } = require('../config/cloudinary');
function createError(message, statusCode) { const error = new Error(message); error.statusCode = statusCode; return error; }
function uploadBuffer(file) { if (!isConfigured()) throw createError('Cloudinary is not configured.', 503); return new Promise((resolve, reject) => cloudinary.uploader.upload_stream({ folder: 'desteor/products', resource_type: 'image' }, (error, result) => error ? reject(error) : resolve({ url: result.secure_url, publicId: result.public_id, width: result.width, height: result.height })).end(file.buffer)); }
async function uploadImages(files) { if (!files?.length) throw createError('At least one image is required.', 422); return Promise.all(files.map(uploadBuffer)); }
async function deleteImage(publicId) { if (!publicId) throw createError('Cloudinary public ID is required.', 422); if (!isConfigured()) throw createError('Cloudinary is not configured.', 503); await cloudinary.uploader.destroy(publicId, { resource_type: 'image' }); }
module.exports = { uploadImages, deleteImage };
