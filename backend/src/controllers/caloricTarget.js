const catchAsync = require('../utils/functions/catchAsync');

const caloricTargetDto = require('../dtos/caloricTarget');
const caloricTargetValidator = require('../validators/caloricTarget');
const caloricTargetService = require('../services/caloricTarget');

const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const SuccessResponse = require('../utils/classes/SuccessResponse');

const create = async (req, res, next) => {
    const { error, value } = caloricTargetValidator.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const created = await caloricTargetService.create(req.user, value);
    next(
        new SuccessResponse(201, 'Caloric target successfully created.', {
            caloricTarget: caloricTargetDto(created),
        })
    );
};

const getAllByUserId = catchAsync(async (req, res, next) => {
    const caloricTargets = await caloricTargetService.getAllByUserId(req.user._id);
    next(
        new SuccessResponse(200, 'Caloric targets successfully retrieved.', {
            total: caloricTargets.length,
            caloricTargets: caloricTargets.map(caloricTargetDto),
        })
    );
});

const deleteByIdAndUserId = catchAsync(async (req, res, next) => {
    await caloricTargetService.deleteByIdAndUserId(req.params.id, req.user._id);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserId,
    deleteByIdAndUserId,
};
