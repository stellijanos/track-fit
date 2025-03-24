const catchAsync = require('../utils/functions/catchAsync');
const mealPlanDto = require('../dtos/mealPlan');
const mealPlanValidator = require('../validators/mealPlan');
const mealPlanService = require('../services/mealPlan');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');

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

const getAllPreviewByUserId = async (req, res, next) => {
    const mealPlans = await mealPlanService.getAllPreviewByUserId(req.user._id);
    next(
        new SuccessResponse(200, 'Meal plans successfully retrieved.', {
            total: mealPlans.length,
            mealPlans: mealPlans.map(mealPlanDto),
        })
    );
};

const getByIdAndUserId = catchAsync(async (req, res, next) => {
    const mealPlan = await mealPlanService.getByIdAndUserId(req.params.mealPlanId, req.user._id);
    next(
        new SuccessResponse(200, 'Meal plan successfully retrieved.', {
            mealPlan: mealPlanDto(mealPlan),
        })
    );
});

module.exports = {
    create,
    getAllPreviewByUserId,
    getByIdAndUserId,
};
