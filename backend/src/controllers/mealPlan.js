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

module.exports = {
    create,
};
