const express = require('express');
const caloricTargetController = require('../controllers/caloricTarget');

const router = express.Router();

router.route('/').post(caloricTargetController.create).get(caloricTargetController.getAllByUserId);
router.delete('/:caloricTargetId', caloricTargetController.deleteByIdAndUserId);

module.exports = router;
