const express = require('express');
const pdfExportController = require('../controllers/pdfExport');
const csvExportController = require('../controllers/csvExport.');

const router = express.Router();

router.get('/pdf/meal-plans/:mealPlanId', pdfExportController.mealPlan);
router.get('/csv/:subject', csvExportController);

module.exports = router;
