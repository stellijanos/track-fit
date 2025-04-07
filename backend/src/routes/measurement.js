const express = require('express');
const measurementController = require('../controllers/measurement');

const router = express.Router();

router.route('/').post(measurementController.create).get(measurementController.getAllByUserId);
router
    .route('/:measurementId')
    .patch(measurementController.updateByIdAndUserId)
    .delete(measurementController.deleteByIdAndUserId);

module.exports = router;
