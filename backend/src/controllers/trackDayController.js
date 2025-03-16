const catchAsync = require('../utils/functions/catchAsync');
const trackDayDto = require('../dtos/trackDayDto');
const trackDayValidators = require('../validators/trackDayValidators');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const trackDayService = require('../services/trackDayService');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const getByDateAndUser = catchAsync(async (req, res, next) => {
    const { error, value } = trackDayValidators.create.validate(req.params);
    if (error) throw new UnprocessableEntityError(error.message);

    const trackDay = await trackDayService.getByDateAndUser(value.date, req.user);
    next(new SuccessResponse(200, 'Trackday successfully received.', { trackDay: trackDayDto.response(trackDay) }));
});

const addWaterIntake = catchAsync(async (req, res, next) => {
    const { error, value } = trackDayValidators.addWaterIntake.validate({ ...req.params, ...req.body });
    if (error) throw new UnprocessableEntityError(error.message);

    const trackDay = await trackDayService.addWaterIntake(value.date, req.user, value.quantity);
    next(new SuccessResponse(200, 'Water intake successfully added.', { trackDay: trackDayDto.response(trackDay) }));
});

module.exports = {
    getByDateAndUser,
    addWaterIntake,
};
