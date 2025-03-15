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

const getAllByUserId = catchAsync(async (req, res, next) => {
    const caloricTargets = await caloricTargetService.getAllByUserId(req.user._id);
    next(
        new SuccessResponse(200, 'Caloric targets successfully retrieved.', {
            total: caloricTargets.length,
            caloricTargets: caloricTargets.map(caloricTargetDto.response),
        })
    );
});

const renameByIdAndUserId = catchAsync(async (req, res, next) => {
    const { error, value } = caloricTargetDto.update.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await caloricTargetService.renameByIdAndUserId(req.params.id, req.user._id, value.name);
    next(
        new SuccessResponse(200, 'Caloric target successfully renamed.', {
            caloricTarget: caloricTargetDto.response(updated),
        })
    );
});

const deleteByIdAndUserId = catchAsync(async (req, res, next) => {
    console.log(req.user);
    await caloricTargetService.deleteByIdAndUserId(req.params.id, req.user._id, req.user.currentCaloricTarget);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserId,
    renameByIdAndUserId,
    deleteByIdAndUserId,
};
