const catchAsync = require('../utils/functions/catchAsync');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const activityDto = require('../dtos/activityDto');
const activityService = require('../services/activityService');

const create = catchAsync(async (req, res) => {
    const { error, value } = activityDto.create.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const activity = await activityService.create(req.user._id, value);

    res.status(201).json(
        new SuccessResponse('Activity successfully created.', {
            activity: activityDto.response(activity),
        })
    );
});

const getAllByUserorPublic = catchAsync(async (req, res) => {
    const activities = await activityService.getAllByUserorPublic(req.user._id);
    res.status(200).json(
        new SuccessResponse(`Activitites successfully retrieved activities.`, {
            total: activities.length,
            activities: activities.map(activityDto.response),
        })
    );
});

const updateByUserAndId = catchAsync(async (req, res) => {
    const { error, value } = activityDto.update.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const updated = await activityService.updateByIdAndUserId(req.user._id, req.params.activityId, value);

    res.status(200).json(
        new SuccessResponse('Activity successfully updated.', { activity: activityDto.response(updated) })
    );
});

const deleteByUserIdAndId = catchAsync(async (req, res) => {
    await activityService.deleteByUserAndId(req.user._id);

    res.status(204).send();
});

module.exports = {
    create,
    getAllByUserorPublic,
    updateByUserAndId,
    deleteByUserIdAndId,
};
