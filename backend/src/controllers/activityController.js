const activityService = require('../services/activityService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const catchAsync = require('../utils/functions/catchAsync');

const create = catchAsync(async (req, res) => {
    const activity = await activityService.createOne(req.user._id, req.body);
    res.status(201).json(
        new SuccessResponse('Activity successfully created', { activity })
    );
});

module.exports = {
    create,
};
