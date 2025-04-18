const express = require('express');
const pdfExportController = require('../controllers/pdfExport');
const csvExportController = require('../controllers/csvExport.');

const router = express.Router();

router.get('/pdf/meal-plans/:mealPlanId', pdfExportController.mealPlan);

router.get('/csv/measurements', csvExportController.measurements);

module.exports = router;
