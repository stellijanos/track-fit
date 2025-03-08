const express = require('express');
const measurementController = require('../controllers/measurementController');

const router = express.Router();

router.post('/', measurementController.create);

module.exports = router;
