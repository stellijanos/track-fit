const catchAsync = require('../utils/functions/catchAsync');
const measurementService = require('../services/measurementService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const measurementDto = require('../dtos/measurementDto');
const measurementValidator = require('../validators/measurement');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const create = catchAsync(async (req, res, next) => {
    const { error, value } = measurementValidator.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const measurement = await measurementService.create(req.user._id, value);
    next(
        new SuccessResponse(201, 'Measurement successfully created', {
            measurement: measurementDto(measurement),
        })
    );
});

const getAllByUserId = catchAsync(async (req, res, next) => {
    const measurements = await measurementService.getAllByUserId(req.user._id);
    next(
        new SuccessResponse(200, 'Measurements successfully retrieved.', {
            total: measurements.length,
            measurements: measurements.map(measurementDto),
        })
    );
});

const updateByIdAndUserId = catchAsync(async (req, res, next) => {
    const { error, value } = measurementValidator.update.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await measurementService.updateByIdAndUserId(req.params.measurementId, req.user._id, value);
    next(new SuccessResponse(200, 'Measurement successfully updated.', { measurement: measurementDto(updated) }));
});

const deleteByIdAndUserId = catchAsync(async (req, res, next) => {
    await measurementService.deleteByIdAndUserId(req.params.measurementId, req.user._id);
    next(new SuccessResponse(204));
});

module.exports = {
    create,
    getAllByUserId,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
