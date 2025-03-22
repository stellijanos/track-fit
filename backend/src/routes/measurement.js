const express = require('express');
const measurementController = require('../controllers/measurement');

const router = express.Router();

router.post('/', measurementController.create);
router.get('/', measurementController.getAllByUserId);
router.patch('/:measurementId', measurementController.updateByIdAndUserId);
router.delete('/:measurementId', measurementController.deleteByIdAndUserId);

module.exports = router;
