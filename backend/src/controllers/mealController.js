const catchAsync = require('../utils/functions/catchAsync');
const mealService = require('../services/mealService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const { mealResponseDTO } = require('../dtos/mealDto');

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
    getAllByUserOrPublic,
};
