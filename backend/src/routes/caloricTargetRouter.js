const express = require('express');
const caloricTargetController = require('../controllers/caloricTargetController');

const router = express.Router();

router.post('/', caloricTargetController.create);
router.get('/', caloricTargetController.getAllByUserId);
router.patch('/:id', caloricTargetController.rename);

module.exports = router;
