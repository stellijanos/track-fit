const catchAsync = require('../utils/functions/catchAsync');
const entryValidator = require('../validators/entry');
const entryDto = require('../dtos/entry');
const entryService = require('../services/entry');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

/**
 * Retrieve water intake, activity- and meal entries on the specified date for the current authenticated user.
 *
 * @route GET /users/me/entries/:date
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with success message and created activity entry (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const getByDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = entryValidator.getAll.validate(req.params);
    if (error) throw new UnprocessableEntityError(error.message);

    const entries = await entryService.getByDateAndUserId(req.params.date, req.userId);
    console.log(entries);
    next(
        new SuccessResponse(200, 'Entries successfully created.', {
            entries: entryDto(entries),
        })
    );
});

module.exports = {
    getByDateAndUserId,
};
