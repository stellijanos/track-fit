const express = require('express');
const waterTargetController = require('../controllers/waterTargetController');

const router = express.Router();

router.post('/', waterTargetController.create);
router.get('/', waterTargetController.getAllByUserId);

module.exports = router;
