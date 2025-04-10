const catchAsync = require('../utils/functions/catchAsync');
const waterIntakeDto = require('../dtos/waterIntake');
const waterIntakeValidator = require('../validators/waterIntake');
const waterIntakeService = require('../services/waterIntake');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

/**
 * Retrieve water intake on the provided date for the current authenticated user.
 *
 * @route GET /users/me/entries/:date/water-intake
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with success message and found water intake (200)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const getByDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = waterIntakeValidator.get.validate({ ...req.params });
    if (error) throw new UnprocessableEntityError(error.message);

    const waterIntake = await waterIntakeService.getByDateAndUserId(req.params.date, req.userId);
    next(
        new SuccessResponse(200, 'Water intake successfully retrieved.', {
            waterIntake: waterIntakeDto(waterIntake),
        })
    );
});

/**
 * Add water intake entry for the current authenticated user.
 *
 * @route POST /users/me/entries/:date/water-intake
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with success message and updated water intake with the created entry (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const createEntryByDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = waterIntakeValidator.addEntry.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const waterIntake = await waterIntakeService.createEntryByDateAndUserId(
        req.params.date,
        req.userId,
        req.body
    );
    next(
        new SuccessResponse(201, 'Water intake entry successfully added.', {
            waterIntake: waterIntakeDto(waterIntake),
        })
    );
});

/**
 * Delete water intake entry for the current authenticated user.
 *
 * @route DELETE /users/me/entries/:date/water-intake/:entryId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with no content (204)
 * @throws {NotFoundError} - Water intake not found (404)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const deleteEntryByIdDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = waterIntakeValidator.deleteEntry.validate(req.params);
    if (error) throw new UnprocessableEntityError(error.message);

    await waterIntakeService.deleteEntryByIdDateAndUserId(
        req.params.entryId,
        req.params.date,
        req.userId
    );
    next(new SuccessResponse(204));
});

module.exports = {
    getByDateAndUserId,
    createEntryByDateAndUserId,
    deleteEntryByIdDateAndUserId,
};
