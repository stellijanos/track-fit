const catchAsync = require('../utils/functions/catchAsync');
const mealEntryValidator = require('../validators/mealEntry');
const mealEntryDto = require('../dtos/mealEntry');
const mealEntryService = require('../services/mealEntry');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

/**
 * Create a new activity entry.
 *
 * @route POST /users/me/track-days/:date/activities
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and created meal entries(201)
 * @throws {BadRequestError} - Failed to create track day (400)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {InternalServerError} - An error occured, please try again (500)
 */
const createMany = catchAsync(async (req, res, next) => {
    const { error, value } = mealEntryValidator.create.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const mealEntries = await mealEntryService.createMany(req.user, value);
    next(
        new SuccessResponse(201, 'Meal entry successfully added.', {
            total: mealEntries.length,
            mealEntries: mealEntries.map(mealEntryDto),
        })
    );
});

/**
 * Retrieve all meal entries for a trackday.
 *
 * @route GET /users/me/track-days/:date/meal-entries
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and retrieved meal entries (200)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const getAllByTrackDayId = catchAsync(async (req, res, next) => {
    const { error, value } = mealEntryValidator.date.validate(req.params.date);
    if (error) throw new UnprocessableEntityError(error.message);

    const mealEntries = await mealEntryService.getAllByTrackDayId(req.user, value);

    next(
        new SuccessResponse(200, 'Meal entries successfully retrieved.', {
            total: mealEntries.length,
            mealEntries: mealEntries.map(mealEntryDto),
        })
    );
});

/**
 * Update a meal entry.
 *
 * @route PATCH /users/me/track-days/:date/meal-entries/:mealEntryId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and updated meal entry (200)
 * @throws {BadRequestError} - Failed to create track day (400)
 * @throws {NotFoundError} - Meal entry not found (404)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {UnprocessableEntityError} - Meal entry does not belong to your trackday (422)
 */
const updateByIdAndTrackDayId = catchAsync(async (req, res, next) => {
    const { error, value } = mealEntryValidator.update.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await mealEntryService.updateByIdAndTrackDayId(req.user, value);
    next(
        new SuccessResponse(200, 'Meal entry successfully updated.', {
            mealEntry: mealEntryDto(updated),
        })
    );
});

/**
 * Delete a meal entry.
 *
 * @route DELETE /users/me/track-days/:date/meal-entries/:mealEntryId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and created activity entry (204)
 * @throws {BadRequestError} - Failed to create track day (400)
 * @throws {BadRequestError} - Failed to delete meal entry: not found or missing permissions (400)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const deleteByIdAndTrackDayId = catchAsync(async (req, res, next) => {
    const { error, value } = mealEntryValidator.deleteByIdAndTrackDayId.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    await mealEntryService.deleteByIdAndTrackDayId(req.user, value);
    next(new SuccessResponse(204));
});

module.exports = {
    createMany,
    getAllByTrackDayId,
    updateByIdAndTrackDayId,
    deleteByIdAndTrackDayId,
};
