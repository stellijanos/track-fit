const express = require('express');
const caloricTargetController = require('../controllers/caloricTargetController');

const router = express.Router();

router.post('/', caloricTargetController.create);

module.exports = router;
