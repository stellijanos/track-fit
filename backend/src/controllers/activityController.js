const catchAsync = require('../utils/functions/catchAsync');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const {
    activityRequestDTO,
    activityResponseDTO,
} = require('../dtos/activityDto');
const activityService = require('../services/activityService');

const create = catchAsync(async (req, res) => {
    const { error, value } = activityRequestDTO.validate(req.body);
    if (error) throw new ErrorResponse(422, error.message);
    
    const activity = await activityService.createOne(req.user._id, value);
    res.status(201).json(
        new SuccessResponse('Activity successfully created', {
            activity: activityResponseDTO(activity),
        })
    );
});

module.exports = {
    create,
};
