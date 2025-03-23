const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const catchAsync = require('../utils/functions/catchAsync');
const mealEntryValidator = require('../validators/mealEntry');
const mealEntryService = require('../services/mealEntry');
const SuccessResponse = require('../utils/classes/SuccessResponse');

const createMany = async (req, res, next) => {
    const { error, value } = mealEntryValidator.create.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const mealEntries = await mealEntryService.createMany(req.user, value);
    next(
        new SuccessResponse(201, 'Meal entry successfully added.', {
            total: mealEntries.length,
            mealEntries,
        })
    );
};

module.exports = {
    createMany,
};
