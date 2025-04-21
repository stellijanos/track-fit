const express = require('express');
const pdfExportController = require('../controllers/pdfExport');
const csvExportController = require('../controllers/csvExport.');

const router = express.Router();

router.get('/pdf/meal-plans/:mealPlanId', pdfExportController.mealPlan);

router.get('/csv/measurements', csvExportController.measurements);
router.get('/csv/activities', csvExportController.activities);
router.get('/csv/meals', csvExportController.meals);
router.get('/csv/caloric-targets', csvExportController.caloricTargets);
router.get('/csv/water-intake', csvExportController.waterIntake);

module.exports = router;
