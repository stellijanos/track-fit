const catchAsync = require('../utils/functions/catchAsync');
const activityEntryDto = require('../dtos/activityEntryDto');
const activityEntryValidator = require('../validators/activityEntryValidator');
const activityEntryService = require('../services/activityEntryService');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');
const SuccessResponse = require('../utils/classes/SuccessResponse');

const create = catchAsync(async (req, res, next) => {
    const { error, value } = activityEntryValidator.create.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const activityEntry = await activityEntryService.create(req.user, value);

    next(
        new SuccessResponse(201, 'Activity entry successfully created.', {
            activityEntry: activityEntryDto.response(activityEntry),
            value,
        })
    );
});

const getAllByUserAndDate = catchAsync(async (req, res, next) => {
    const { error, value } = activityEntryValidator.getAll.validate({ ...req.params });
    if (error) throw new UnprocessableEntityError(error.message);

    const activityEntries = await activityEntryService.getAllByUserAndDate(req.user, value.date);
    next(
        new SuccessResponse(200, 'Activitiy entries successfully retrieved.', {
            total: activityEntries.length,
            activityEntries: activityEntries.map(activityEntryDto.response),
        })
    );
});

module.exports = {
    create,
    getAllByUserAndDate,
};
getAllByUserAndDate;
