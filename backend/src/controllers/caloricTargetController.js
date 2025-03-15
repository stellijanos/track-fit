const catchAsync = require('../utils/functions/catchAsync');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const caloricTargetDto = require('../dtos/caloricTargetDto');
const caloricTargetService = require('../services/caloricTargetService');

const create = catchAsync(async (req, res, next) => {
    const { error, value } = caloricTargetDto.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const created = await caloricTargetService.create(req.user._id, value);
    next(
        new SuccessResponse(201, 'Caloric target successfully created.', {
            caloricTarget: caloricTargetDto.response(created),
        })
    );
});

module.exports = {
    create,
};
