const catchAsync = require('../utils/functions/catchAsync');
const mealService = require('../services/mealService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const mealDto = require('../dtos/mealDto');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const create = catchAsync(async (req, res, next) => {
    const { error, value } = mealDto.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const meal = await mealService.createOne(req.user._id, value);
    next(new SuccessResponse(201, 'Meal successfully created.', { meal: mealDto.response(meal) }));
});

const getAllByUserOrPublic = catchAsync(async (req, res, next) => {
    const meals = await mealService.getAllByUserOrPublic(req.user._id);
    next(
        new SuccessResponse(200, `Meals successfully retrieved.`, {
            total: meals.length,
            meals: meals.map(mealDto.response),
        })
    );
});

const updateByUserAndId = catchAsync(async (req, res, next) => {
    const { error, value } = mealDto.update.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await mealService.updateByUserAndId(req.user._id, req.params.mealId, value);
    next(new SuccessResponse(200, 'Meal successfully updated.', { meal: mealDto.response(updated) }));
});

const deleteByUserAndId = catchAsync(async (req, res, next) => {
    await mealService.deleteByUserAndId(req.user._id, req.params.mealId);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserOrPublic,
    updateByUserAndId,
    deleteByUserAndId,
};
