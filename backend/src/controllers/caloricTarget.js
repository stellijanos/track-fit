const catchAsync = require('../utils/functions/catchAsync');

const caloricTargetDto = require('../dtos/caloricTarget');
const caloricTargetValidator = require('../validators/caloricTarget');
const caloricTargetService = require('../services/caloricTarget');

const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

/**
 * Create a new caloric target for the current authenticated user.
 *
 * @route POST /users/me/caloric-targets
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and created caloric target (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {UnprocessableEntityError} - Enter your height and at least 1 measurement in order to get caloric target (422)
 * @throws {BadRequestError} - Failed to update current caloric target (400)
 * @throws {BadRequestError} - Failed to set users current caloric target (400)
 */
const create = async (req, res, next) => {
    const { error, value } = caloricTargetValidator.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const created = await caloricTargetService.create(req.user, value);
    next(
        new SuccessResponse(201, 'Caloric target successfully created.', {
            caloricTarget: caloricTargetDto(created),
        })
    );
};

/**
 * Retrieve all caloric targets of the current authenticated user
 *
 * @route GET /users/me/caloric-targets
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with success message and the retrieved caloric targets (200)
 */
const getAllByUserId = catchAsync(async (req, res, next) => {
    const caloricTargets = await caloricTargetService.getAllByUserId(req.user._id);
    next(
        new SuccessResponse(200, 'Caloric targets successfully retrieved.', {
            total: caloricTargets.length,
            caloricTargets: caloricTargets.map(caloricTargetDto),
        })
    );
});

/**
 * Delete caloric target (not current one) of the current authenticated user.
 *
 * @route DELETE /users/me/caloric-targets/:caloricTargetId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responsds with no content (204)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 * @throws {ConflictError} - Current caloric target cannot be deleted (409)
 * @throws {BadRequestError} - Failed to delete caloric target: not found or missing permissions (400)
 */
const deleteByIdAndUserId = catchAsync(async (req, res, next) => {
    await caloricTargetService.deleteByIdAndUserId(req.params.caloricTargetId, req.user._id);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserId,
    deleteByIdAndUserId,
};
