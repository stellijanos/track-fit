const express = require('express');
const mealController = require('../controllers/mealController');

const router = express.Router();

router.get('/', mealController.getAllByUserOrPublic);
router.post('/', mealController.create);
router.patch('/:mealId', mealController.updateByUserAndId);

module.exports = router;
