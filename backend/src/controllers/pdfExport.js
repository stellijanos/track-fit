const catchAsync = require('../utils/functions/catchAsync');
const PdfResponse = require('../utils/classes/PdfResponse');
const pdfExportService = require('../services/pdfExport');

const mealPlan = catchAsync(async (req, res, next) => {
    const buffer = await pdfExportService.mealPlan(req.params.mealPlanId, req.userId);
    console.log(buffer);
    next(new PdfResponse(buffer, `meal-plan-${Date.now()}`));
});

module.exports = { mealPlan };
