const catchAsync = require('../utils/functions/catchAsync');
const mealEntryValidator = require('../validators/mealEntry');
const mealEntryDto = require('../dtos/mealEntry');
const mealEntryService = require('../services/mealEntry');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

/**
 * Create a new meal entry for the current authenticated user.
 *
 * @route POST /users/me/entries/:date/meals
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and created meal entries(201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const createMany = catchAsync(async (req, res, next) => {
    const { error } = mealEntryValidator.create.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const mealEntries = await mealEntryService.createMany(req.params.date, req.userId, req.body);
    next(
        new SuccessResponse(201, 'Meal entry successfully added.', {
            total: mealEntries.length,
            mealEntries: mealEntries.map(mealEntryDto),
        })
    );
});

/**
 * Retrieve all meal entries for the provided date for the current authenticated user.
 *
 * @route GET /users/me/entries/:date/meals
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and retrieved meal entries (200)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const getAllByDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = mealEntryValidator.get.validate(req.params);
    if (error) throw new UnprocessableEntityError(error.message);

    const mealEntries = await mealEntryService.getAllByDateAndUserId(req.params.date, req.userId);
    next(
        new SuccessResponse(200, 'Meal entries successfully retrieved.', {
            total: mealEntries.length,
            mealEntries: mealEntries.map(mealEntryDto),
        })
    );
});

/**
 * Update a meal entry for the current authenticated user.
 *
 * @route PATCH /users/me/entries/:date/meals/:mealEntryId
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and updated meal entry (200)
 * @throws {NotFoundError} - Meal entry not found (404)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const updateByIdAndDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = mealEntryValidator.update.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await mealEntryService.updateByIdAndDateAndUserId(
        req.params.mealEntryId,
        req.params.date,
        req.userId,
        req.body
    );
    next(
        new SuccessResponse(200, 'Meal entry successfully updated.', {
            mealEntry: mealEntryDto(updated),
        })
    );
});

/**
 * Delete a meal entry for the current authenticated user.
 *
 * @route DELETE /users/me/entries/:date/meals/:mealEntryId
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and created meal entry (204)
 * @throws {NotFoundError} - Meal entry not found (404)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const deleteByIdAndDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = mealEntryValidator.remove.validate({
        ...req.params,
        ...req.body,
    });
    if (error) throw new UnprocessableEntityError(error.message);

    await mealEntryService.deleteByIdAndDateAndUserId(
        req.params.mealEntryId,
        req.params.date,
        req.userId
    );
    next(new SuccessResponse(204));
});

module.exports = {
    createMany,
    getAllByDateAndUserId,
    updateByIdAndDateAndUserId,
    deleteByIdAndDateAndUserId,
};
