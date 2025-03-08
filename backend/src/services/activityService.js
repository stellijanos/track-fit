const activityRepository = require('../repositories/activityRepository');
const ErrorResponse = require('../utils/classes/ErrorResponse');

const createOne = async (userId, data) => {
    const activity = {
        user: userId,
        name: data.name,
        caloriesPerHour: data.caloriesPerHour,
        visibility: data.visibility,
    };

    return await activityRepository.createOne(activity);
};

const getAllByUserorPublic = async (userId) =>
    await activityRepository.findByUserOrPublic(userId);

const updateOne = async (userId, activityId, data) => {
    const updated = {
        user: userId,
        name: data.name,
        caloriesPerHour: data.caloriesPerHour,
        visibility: data.visibility,
    };
    return await activityRepository.updateOneByUserAndId(
        userId,
        activityId,
        updated
    );
};

const deleteByUserAndId = async (userId, activityId) => {
    const deleted = await activityRepository.deleteByUserAndId(
        userId,
        activityId
    );
    if (!deleted) throw new ErrorResponse(400, 'Failed or missing permissions to delete activity.');
};

module.exports = {
    createOne,
    getAllByUserorPublic,
    updateOne,
    deleteByUserAndId,
};
