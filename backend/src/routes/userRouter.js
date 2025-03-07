const express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const upload = require('../middleware/multer');

const router = express.Router();

router.use(jwtMiddleware);

router.get('/me', userController.getMe);
router.patch('/me', userController.updateMe);
router.delete('/me', userController.deleteMe);

router.post(
    '/me/profile-picture',
    upload.single('image'),
    userController.changeProfilePicture
);
router.delete('/me/profile-picture', userController.deleteProfilePicture);

module.exports = router;
