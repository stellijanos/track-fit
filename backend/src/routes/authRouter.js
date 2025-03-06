const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/password/change', jwtMiddleware, authController.changePassword);
router.put('/password/reset', authController.resetPassword);
router.post('/token/refresh', authController.refreshToken);

module.exports = router;
