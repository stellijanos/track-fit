const express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

router.use(jwtMiddleware);

router
    .route('/me')
    .get(userController.getMe)
    .patch(userController.updateMe)
    .delete(userController.deleteMe);

router
    .route('/me/profile-picture')
    .post(upload.single('image'), userController.changeMyProfilePicture)
    .delete(userController.deleteMyProfilePicture);

module.exports = router;
