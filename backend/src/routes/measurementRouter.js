const express = require('express');
const measurementController = require('../controllers/measurementController');

const router = express.Router();

router.post('/', measurementController.create);
router.get('/', measurementController.getAllByUserId);
router.patch('/:measurementId', measurementController.updateByIdAndUserId);

module.exports = router;
