const catchAsync = require('../utils/functions/catchAsync');
const mealPlanDto = require('../dtos/mealPlan');
const mealPlanValidator = require('../validators/mealPlan');
const mealPlanService = require('../services/mealPlan');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');

/**
 * Create a new activity entry.
 *
 * @route POST /users/me/meal-plans
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with success message and created meal plan (201)
 * @throws {UnprocessableEntityError} - Requests body validation failed (422)
 */
const create = catchAsync(async (req, res, next) => {
    const { error, value } = mealPlanValidator.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const mealPlan = await mealPlanService.create(req.user, value);
    next(
        new SuccessResponse(201, 'Meal plan successfully generated.', {
            mealPlan: mealPlanDto(mealPlan),
        })
    );
});

/**
 * Retrieve all meal entry previews (not all data) of the user
 *
 * @route GET /users/me/meal-plans
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with success message and the retrieved meal plan previews (200)
 */
const getAllPreviewByUserId = async (req, res, next) => {
    const mealPlans = await mealPlanService.getAllPreviewByUserId(req.userId);
    next(
        new SuccessResponse(200, 'Meal plans successfully retrieved.', {
            total: mealPlans.length,
            mealPlans: mealPlans.map(mealPlanDto),
        })
    );
};

/**
 * Retrieve meal plan based on its Id for current authenticated user
 *
 * @route GET /users/me/meal-plans/:mealPlanId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with success message and the retrieved meal plan (200)
 * @throws {NotFoundError} - Meal plan not found (404)
 */
const getByIdAndUserId = catchAsync(async (req, res, next) => {
    const mealPlan = await mealPlanService.getByIdAndUserId(req.params.mealPlanId, req.userId);
    next(
        new SuccessResponse(200, 'Meal plan successfully retrieved.', {
            mealPlan: mealPlanDto(mealPlan),
        })
    );
});

/**
 * Delete meal plan based on its id for current authenticated user
 *
 * @route DELETE /users/me/meal-plans/:mealPlanId
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {void} - Responds with no content (204)
 * @throws {NotFoundError} - Meal plan not found (404)
 */
const deleteByIdAndUserId = catchAsync(async (req, res, next) => {
    await mealPlanService.deleteByIdAndUserId(req.params.mealPlanId, req.userId);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllPreviewByUserId,
    getByIdAndUserId,
    deleteByIdAndUserId,
};
