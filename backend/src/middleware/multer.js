const fs = require('fs');
const path = require('path');
const multer = require('multer');
const constants = require('../config/constants');
const ErrorResponse = require('../utils/classes/ErrorResponse');

const uploadPath = constants.TEMP_UPLOAD_DIR;
const profilePicturePath = constants.PROFILE_PICTURE_DIR;
fs.mkdirSync(uploadPath, { recursive: true });
fs.mkdirSync(profilePicturePath, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new ErrorResponse(
                422,
                'Only image files (jpeg, png, jpg) are allowed'
            ),
            false
        );
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
