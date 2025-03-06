const express = require('express');
const authController = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/password/change', jwtMiddleware, authController.changePassword);

module.exports = router;
