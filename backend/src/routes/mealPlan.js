const express = require('express');
const mealPlanController = require('../controllers/mealPlan');

const router = express.Router();

router.route('/').post(mealPlanController.create).get(mealPlanController.getAllPreviewByUserId);
router
    .route('/:mealPlanId')
    .get(mealPlanController.getByIdAndUserId)
    .delete(mealPlanController.deleteByIdAndUserId);

module.exports = router;
