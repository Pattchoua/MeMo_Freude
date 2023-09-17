// Import the Cloudinary SDK and specifically the v2 module
const cloudinary = require('cloudinary').v2;

// Destructure the required Cloudinary environment variables
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

//  Cloudinary configuration using the extracted environment variables
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,   
  api_key: CLOUDINARY_API_KEY,         
  api_secret: CLOUDINARY_API_SECRET,   
});

module.exports = cloudinary;