const catchAsync = require('../utils/functions/catchAsync');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const { activityRequestDTO, activityResponseDTO } = require('../dtos/activityDto');
const activityService = require('../services/activityService');

const create = catchAsync(async (req, res) => {
    const { error, value } = activityRequestDTO.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const activity = await activityService.createOne(req.user._id, value);
    res.status(201).json(
        new SuccessResponse('Activity successfully created.', {
            activity: activityResponseDTO(activity),
        })
    );
});

const getAllByUserorPublic = catchAsync(async (req, res) => {
    const activities = await activityService.getAllByUserorPublic(req.user._id);
    return res.status(200).json(
        new SuccessResponse(`Activitites successfully retrieved activities.`, {
            total: activities.length,
            activities: activities.map(activityResponseDTO),
        })
    );
});

const updateByUserAndId = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const { activityId } = req.params;
    const data = req.body;
    const updated = await activityService.updateOne(userId, activityId, data);

    res.status(200).json(
        new SuccessResponse('Activity successfully updated.', {
            activity: activityResponseDTO(updated),
        })
    );
});

const deleteByUserIdAndId = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const { activityId } = req.params;
    await activityService.deleteByUserAndId(userId, activityId);
    res.status(204).send();
});

module.exports = {
    create,
    getAllByUserorPublic,
    updateByUserAndId,
    deleteByUserIdAndId,
};
