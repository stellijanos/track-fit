const catchAsync = require('../utils/functions/catchAsync');
const activityEntryDto = require('../dtos/activityEntry');
const activityEntryValidator = require('../validators/activityEntry');
const activityEntryService = require('../services/activityEntry');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

/**
 * Create a new activity entry.
 *
 * @route POST /users/me/entries/:date/activities
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and created activity entry (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const create = catchAsync(async (req, res, next) => {
    const { error, value } = activityEntryValidator.create.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const activityEntry = await activityEntryService.create(req.user, value);
    next(
        new SuccessResponse(201, 'Activity entry successfully created.', {
            activityEntry: activityEntryDto(activityEntry),
        })
    );
});

/**
 * Retrieve all activity entries for the current authenticated user on the provided date
 *
 * @route POST /users/me/entries/:date/activities
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and created activity entry (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const getAllByUserAndDate = catchAsync(async (req, res, next) => {
    const { error } = activityEntryValidator.getAll.validate({ ...req.params });
    if (error) throw new UnprocessableEntityError(error.message);

    const { date } = req.params;
    const { userId } = req;

    const activityEntries = await activityEntryService.getAllByDateAndUserId(date, userId);
    next(
        new SuccessResponse(200, 'Activity entries successfully retrieved.', {
            total: activityEntries.length,
            activityEntries: activityEntries.map(activityEntryDto),
        })
    );
});

/**
 * Update activity entry for the current authenticated user.
 *
 * @route PATCH /users/me/entries/:date/activities/:activityEntryId
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and updated activity entry (200)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {NotFoundError} - Activity entry not found (404)
 */
const updateByIdAndDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = activityEntryValidator.update.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const { activityEntryId, date } = req.params;
    const { userId } = req;
    const data = req.body;

    const updated = await activityEntryService.updateByIdAndDateAndUserId(
        activityEntryId,
        date,
        userId,
        data
    );
    next(
        new SuccessResponse(200, 'Activity entry successfully updated.', {
            activityEntry: activityEntryDto(updated),
        })
    );
});

/**
 * Delete activity entry for the current authenticated user.
 *
 * @route DELETE /users/me/entries/:date/activities/:activityEntryId
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with no content (204)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {NotFoundError} - Activity entry not found (404)
 */
const deleteByIdAndDateAndUserId = catchAsync(async (req, res, next) => {
    const { error } = activityEntryValidator.deleteById.validate(req.params);
    if (error) throw new UnprocessableEntityError(error.message);

    const { activityEntryId, date } = req.params;
    const { userId } = req;

    await activityEntryService.deleteByIdAndDateAndUserId(activityEntryId, date, userId);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserAndDate,
    updateByIdAndDateAndUserId,
    deleteByIdAndDateAndUserId,
};
