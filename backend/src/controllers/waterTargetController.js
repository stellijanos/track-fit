const catchAsync = require('../utils/functions/catchAsync');
const waterTargetDto = require('../dtos/waterTargetDto');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const waterTargetService = require('../services/waterTargetService');

const create = catchAsync(async (req, res) => {
    const { error, value } = waterTargetDto.create.validate(req.body);

    if (error) {
        throw new ErrorResponse(422, error.message);
    }

    const userId = req.user._id;
    const waterTarget = await waterTargetService.create(userId, value);
    res.status(201).json(
        new SuccessResponse('WaterTarget successfully created.', {
            waterTarget: waterTargetDto.response(waterTarget),
        })
    );
});

module.exports = {
    create,
};
