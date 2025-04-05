const catchAsync = require('../utils/functions/catchAsync');
const activityEntryDto = require('../dtos/activityEntry');
const activityEntryValidator = require('../validators/activityEntry');
const activityEntryService = require('../services/activityEntry');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

/**
 * Create a new activity entry.
 *
 * @route POST /users/me/track-days/:date/activities
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and created activity entry (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {BadRequestError} - Failed to create activity entry (400)
 * @throws {BadRequestError} - Failed to create track day (400)
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
 * @route POST /users/me/track-days/:date/activities
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and created activity entry (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {BadRequestError} - Failed to create track day (400)
 */
const getAllByUserAndDate = catchAsync(async (req, res, next) => {
    const { error, value } = activityEntryValidator.getAll.validate({ ...req.params });
    if (error) throw new UnprocessableEntityError(error.message);

    const activityEntries = await activityEntryService.getAllByUserAndDate(req.user, value.date);
    next(
        new SuccessResponse(200, 'Activitiy entries successfully retrieved.', {
            total: activityEntries.length,
            activityEntries: activityEntries.map(activityEntryDto),
        })
    );
});

/**
 * Update activity entry for the current authenticated user.
 *
 * @route PATCH /users/me/track-days/:date/activities/:actiivtyEntryId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and updated activity entry (200)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {BadRequestError} - Failed to create track day.
 */
const updateByIdAndTrackDayId = catchAsync(async (req, res, next) => {
    const { error } = activityEntryValidator.update.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const { activityEntryId, date } = req.params;
    const { user, body } = req;

    const updated = await activityEntryService.updateByIdAndTrackDayId(activityEntryId, date, user, body);
    next(
        new SuccessResponse(200, 'Activity entry successfully updated.', {
            activityEntry: activityEntryDto(updated),
        })
    );
});

/**
 * Delete activity entry for the current authenticated user.
 *
 * @route DELETE /users/me/track-days/:date/activities/:actiivtyEntryId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with no content (204)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {BadRequestError} - Failed to delete activity entry (400)
 */
const deleteByIdAndTrackDayId = catchAsync(async (req, res, next) => {
    const { activityEntryId, date } = req.params;
    const { user } = req;

    const { error } = activityEntryValidator.deleteById.validate({ activityEntryId, date });
    if (error) throw new UnprocessableEntityError(error.message);

    await activityEntryService.deleteByIdAndTrackDayId(activityEntryId, date, user);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserAndDate,
    updateByIdAndTrackDayId,
    deleteByIdAndTrackDayId,
};
