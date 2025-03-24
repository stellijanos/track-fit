const express = require('express');
const mealPlanController = require('../controllers/mealPlan');

const router = express.Router();

router.post('/', mealPlanController.create);
router.get('/', mealPlanController.getAllPreviewByUserId);
router.get('/:mealPlanId', mealPlanController.getByIdAndUserId);

module.exports = router;
