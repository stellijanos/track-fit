const catchAsync = require('../utils/functions/catchAsync');
const mealService = require('../services/mealService');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const { mealRequestDTO, mealResponseDTO } = require('../dtos/mealDto');

const create = catchAsync(async (req, res) => {
    const { error, value } = mealRequestDTO.validate(req.body);
    if (error) throw new ErrorResponse(422, error.message);

    const userId = req.user._id;

    const meal = await mealService.createOne(userId, value);
    res.status(201).json(
        new SuccessResponse('Meal successfully created.', {
            meal: mealResponseDTO(meal),
        })
    );
});

const getAllByUserOrPublic = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const meals = await mealService.getAllByUserOrPublic(userId);
    return res.status(200).json(
        new SuccessResponse(`Meals successfully retrieved.`, {
            total: meals.length,
            meals: meals.map(mealResponseDTO),
        })
    );
});

module.exports = {
    create,
    getAllByUserOrPublic,
};
