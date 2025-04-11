const fs = require('fs');
const path = require('path');
const multer = require('multer');
const constants = require('../config/constants');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');

// Define paths for file upload and profile picture
const uploadPath = constants.TEMP_UPLOAD_DIR;
const profilePicturePath = constants.PROFILE_PICTURE_DIR;

// Create those folders if they do not exist
fs.mkdirSync(uploadPath, { recursive: true });
fs.mkdirSync(profilePicturePath, { recursive: true });

// Initialize multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Create file filter to allow only certain image types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new UnprocessableEntityError('Only image files (jpeg, png, jpg) are allowed'), false);
    }
};

// Export upload function based on defined storage and filter
module.exports = multer({ storage, fileFilter });
