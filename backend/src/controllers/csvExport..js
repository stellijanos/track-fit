const catchAsync = require('../utils/functions/catchAsync');
const csvExportService = require('../services/csvExport');
const CSVResponse = require('../utils/classes/CSVResponse');

/**
 * Generic data csv export for the current authenticated user.
 *
 * @route GET /users/me/caloric-targets
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and the exported data (200)
 * @throws {NotFoundError} - Data not found (404)
 * @throws {UnprocessableEntityError} - Exports for provided subject not supported (422)
 */
module.exports = catchAsync(async (req, res, next) => {
    const { from, until } = req.query;
    const { subject } = req.params;
    const data = await csvExportService(req.userId, from, until, subject);

    next(new CSVResponse(data, `${subject}-${Date.now()}`));
});
