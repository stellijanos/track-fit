const express = require('express');
const caloricTargetController = require('../controllers/caloricTargetController');

const router = express.Router();

router.post('/', caloricTargetController.create);
router.get('/', caloricTargetController.getAllByUserId);
router.patch('/:id', caloricTargetController.renameByIdAndUserId);
router.delete('/:id', caloricTargetController.deleteByIdAndUserId);

module.exports = router;
