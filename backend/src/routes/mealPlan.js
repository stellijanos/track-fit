const express = require('express');
const mealPlanController = require('../controllers/mealPlan');

const router = express.Router();

router.post('/', mealPlanController.create);

module.exports = router;
