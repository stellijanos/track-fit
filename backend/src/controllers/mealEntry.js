const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const catchAsync = require('../utils/functions/catchAsync');
const mealEntryDto = require('../dtos/mealEntry');
const mealEntryValidator = require('../validators/mealEntry');
const mealEntryService = require('../services/mealEntry');
const SuccessResponse = require('../utils/classes/SuccessResponse');

const createMany = catchAsync(async (req, res, next) => {
    const { error, value } = mealEntryValidator.create.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const mealEntries = await mealEntryService.createMany(req.user, value);
    next(
        new SuccessResponse(201, 'Meal entry successfully added.', {
            total: mealEntries.length,
            mealEntries: mealEntries.map(mealEntryDto),
        })
    );
});

const getAllByTrackDayId = catchAsync(async (req, res, next) => {
    const { error, value } = mealEntryValidator.date.validate(req.params.date);
    if (error) throw new UnprocessableEntityError(error.message);

    const mealEntries = await mealEntryService.getAllByTrackDayId(req.user, value);

    next(
        new SuccessResponse(200, 'Meal entries successfully retrieved.', {
            total: mealEntries.length,
            mealEntries: mealEntries.map(mealEntryDto),
        })
    );
});

const updateByIdAndTrackDayId = catchAsync(async (req, res, next) => {
    const { error, value } = mealEntryValidator.update.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await mealEntryService.updateByIdAndTrackDayId(req.user, value);
    next(
        new SuccessResponse(200, 'Meal entry successfully updated.', {
            mealEntry: mealEntryDto(updated),
        })
    );
});

module.exports = {
    createMany,
    getAllByTrackDayId,
    updateByIdAndTrackDayId
};
