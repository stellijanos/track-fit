const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/password/forgot', authController.forgotPassword);
router.post('/password/reset-code/validate', authController.validatePasswordResetCode);
router.put('/password/reset', authController.resetPassword);
router.put('/password/change', jwtMiddleware, authController.changePassword);
router.post('/token/refresh', authController.refreshToken);

module.exports = router;
