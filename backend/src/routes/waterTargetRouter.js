const express = require('express');
const waterTargetController = require('../controllers/waterTargetController');

const router = express.Router();

router.post('/', waterTargetController.create);

module.exports = router;
