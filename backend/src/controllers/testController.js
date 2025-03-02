const testService = require('../services/testService');
const catchAsync = require('../utils/functions/catchAsync');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const ErrorResponse = require('../utils/classes/ErrorResponse');


const getAll = catchAsync(async (req, res) => {
    const tests = await testService.getAll();
    res.status(200).json(new SuccessResponse(`Successfully received ${tests.length} tests.`, { tests }));
});

module.exports = {
    getAll
}
