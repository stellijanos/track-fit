const express = require('express');
const caloricTargetController = require('../controllers/caloricTarget');

const router = express.Router();

router.post('/', caloricTargetController.create);
router.get('/', caloricTargetController.getAllByUserId);
router.delete('/:caloricTargetId', caloricTargetController.deleteByIdAndUserId);

module.exports = router;
