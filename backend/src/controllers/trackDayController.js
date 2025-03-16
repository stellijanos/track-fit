const catchAsync = require('../utils/functions/catchAsync');
const trackDayDto = require('../dtos/trackDayDto');
const paramValidators = require('../validators/paramValidators');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const trackDayService = require('../services/trackDayService');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const getByDate = catchAsync(async (req, res, next) => {
    const { error, value } = paramValidators.date.validate(req.params.date);
    console.log(error, value);
    if (error) throw new UnprocessableEntityError(error.message);

    const trackDay = await trackDayService.getByDate(value.date, req.user);
    next(new SuccessResponse(200, 'Trackday successfully received', { trackDay: trackDayDto.response(trackDay) }));
});

module.exports = {
    getByDate,
};
