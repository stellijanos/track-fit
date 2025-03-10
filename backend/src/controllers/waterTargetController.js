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

const getAllByUserId = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const waterTargets = await waterTargetService.getAllByUserId(userId);
    res.status(200).json(
        new SuccessResponse('Water targets successfully received.', {
            total: waterTargets.length,
            waterTargets: waterTargets.map(waterTargetDto.response),
        })
    );
});

module.exports = {
    create,
    getAllByUserId,
};
