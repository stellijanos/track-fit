const catchAsync = require('../utils/functions/catchAsync');
const activityEntryDto = require('../dtos/activityEntry');
const activityEntryValidator = require('../validators/activityEntry');
const activityEntryService = require('../services/activityEntry');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

const create = catchAsync(async (req, res, next) => {
    const { error, value } = activityEntryValidator.create.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const activityEntry = await activityEntryService.create(req.user, value);

    next(
        new SuccessResponse(201, 'Activity entry successfully created.', {
            activityEntry: activityEntryDto(activityEntry),
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
            activityEntries: activityEntries.map(activityEntryDto),
        })
    );
});

const updateById = catchAsync(async (req, res, next) => {
    const { error, value } = activityEntryValidator.update.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await activityEntryService.updateById(value);
    next(
        new SuccessResponse(200, 'Activity entry successfully updated.', {
            activityEntry: activityEntryDto(updated),
        })
    );
});

const deleteById = catchAsync(async (req, res, next) => {
    const { activityEntryId } = req.params;
    const { error, value } = activityEntryValidator.deleteById.validate({ activityEntryId });
    if (error) throw new UnprocessableEntityError(error.message);

    await activityEntryService.deleteById(value.activityEntryId);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserAndDate,
    updateById,
    deleteById,
};
