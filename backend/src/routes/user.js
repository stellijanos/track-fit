const express = require('express');
const userController = require('../controllers/user');
const upload = require('../middleware/multer');

const router = express.Router();

router.route('/').get(userController.getMe).patch(userController.updateMe).delete(userController.deleteMe);
router
    .route('/profile-picture')
    .post(upload.single('image'), userController.changeMyProfilePicture)
    .delete(userController.deleteMyProfilePicture);

module.exports = router;
