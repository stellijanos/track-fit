const catchAsync = require('../utils/functions/catchAsync');
const csvExportService = require('../services/csvExport');
const CSVResponse = require('../utils/classes/CSVResponse');

const measurements = catchAsync(async (req, res, next) => {
    const { from, until } = req.params;
    const data = await csvExportService.measurements(req.userId, from, until);
 
    next(new CSVResponse(data, `measurements-${Date.now()}`));
});

module.exports = { measurements };
