let multer;
try { multer = require('multer'); } catch { multer = null; }
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const upload = multer && multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_IMAGE_SIZE, files: 8 }, fileFilter: (req, file, callback) => callback(null, /^image\/(jpeg|png|webp)$/.test(file.mimetype)) });
function uploadImages(req, res, next) { if (!upload) return res.status(503).json({ success: false, message: 'Image upload support is unavailable until server dependencies are installed.' }); upload.array('images', 8)(req, res, (error) => { if (!error) return next(); const message = error.code === 'LIMIT_FILE_SIZE' ? 'Each image must be 5 MB or smaller.' : 'Upload images must be JPEG, PNG, or WebP files.'; return res.status(422).json({ success: false, message, errors: { images: message } }); }); }
module.exports = { uploadImages };
