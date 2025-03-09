const catchAsync = require('../utils/functions/catchAsync');
const measurementService = require('../services/measurementService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const {
    measurementRequestDTO,
    measurementResponseDTO,
} = require('../dtos/measurementDto');

const create = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const data = req.body;
    const measurement = await measurementService.create(userId, data);

    res.status(201).json(
        new SuccessResponse('Measurement successfully created', {
            measurement: measurementResponseDTO(measurement),
        })
    );
});

const getAllByUserId = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const measurements = await measurementService.getAllByUserId(userId);
    res.status(200).json(
        new SuccessResponse('Measurements successfully retrieved.', {
            total: measurements.length,
            measurements: measurements.map(measurementResponseDTO),
        })
    );
});

module.exports = {
    create,
    getAllByUserId,
};
