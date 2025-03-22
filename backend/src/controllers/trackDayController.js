const catchAsync = require('../utils/functions/catchAsync');
const trackDayDto = require('../dtos/trackDayDto');
const trackDayValidators = require('../validators/trackDay');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const trackDayService = require('../services/trackDayService');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const getAllByUserId = catchAsync(async (req, res, next) => {
    const trackDays = await trackDayService.getAllByUserId(req.user._id);
    next(
        new SuccessResponse(200, 'Trackdays successfully retrieved.', {
            total: trackDays.length,
            trackDays: trackDays.map(trackDayDto),
        })
    );
});

const getByDateAndUser = catchAsync(async (req, res, next) => {
    const { error, value } = trackDayValidators.create.validate(req.params);
    if (error) throw new UnprocessableEntityError(error.message);

    const trackDay = await trackDayService.getByDateAndUser(value.date, req.user);
    next(new SuccessResponse(200, 'Trackday successfully received.', { trackDay: trackDayDto(trackDay) }));
});

const addWaterIntake = catchAsync(async (req, res, next) => {
    const { error, value } = trackDayValidators.waterIntake.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const trackDay = await trackDayService.addWaterIntake(value.date, req.user, value.quantity);
    next(new SuccessResponse(200, 'Water intake successfully added.', { trackDay: trackDayDto(trackDay) }));
});

const setWaterIntake = catchAsync(async (req, res, next) => {
    const { error, value } = trackDayValidators.waterIntake.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const trackDay = await trackDayService.setWaterIntake(value.date, req.user, value.quantity);
    next(new SuccessResponse(200, 'Water intake successfully added.', { trackDay: trackDayDto(trackDay) }));
});

module.exports = {
    getAllByUserId,
    getByDateAndUser,
    addWaterIntake,
    setWaterIntake,
};
