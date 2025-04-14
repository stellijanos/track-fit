const express = require('express');
const pdfExportController = require('../controllers/pdfExport');

const router = express.Router();

router.get('/pdf/meal-plans/:mealPlanId', pdfExportController.mealPlan);

module.exports = router;
