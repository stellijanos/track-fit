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

module.exports = {
    create,
};
