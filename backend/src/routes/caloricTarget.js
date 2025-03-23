const express = require('express');
const caloricTargetController = require('../controllers/caloricTarget');

const router = express.Router();

router.post('/', caloricTargetController.create);
router.get('/', caloricTargetController.getAllByUserId);
router.delete('/:id', caloricTargetController.deleteByIdAndUserId);

module.exports = router;
