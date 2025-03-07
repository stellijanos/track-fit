const express = require('express');
const userController = require('../controllers/userController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(jwtMiddleware);

router.get('/me', userController.getMe);

module.exports = router;
