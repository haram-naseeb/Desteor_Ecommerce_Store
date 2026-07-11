const env = require('./env');
let cloudinary;
try { ({ v2: cloudinary } = require('cloudinary')); } catch { cloudinary = null; }

if (cloudinary) cloudinary.config({ cloud_name: env.CLOUDINARY_CLOUD_NAME, api_key: env.CLOUDINARY_API_KEY, api_secret: env.CLOUDINARY_API_SECRET });

function isConfigured() { return Boolean(cloudinary && env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET); }
module.exports = { cloudinary, isConfigured };
