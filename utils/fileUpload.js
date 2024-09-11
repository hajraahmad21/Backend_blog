const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

console.log("keyss",process.env.CLOUDINARY_KEY, process.env.CLOUDINARY_SECRET, process.env.CLOUDINARY_NAME);
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    allowedFormats: ["jpg", "png", "jpeg"],
    params: {
        folder: "blog",
        format: "jpg",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
    },
});

// Initialize Multer with the Cloudinary storage
const upload = multer({ storage });

module.exports = upload;
