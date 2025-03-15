const activityRepository = require('../repositories/activityRepository');
const BadRequestError = require('../errors/BadRequestError');

const create = async (userId, data) => {
    const activity = {
        user: userId,
        name: data.name,
        caloriesPerHour: data.caloriesPerHour,
        visibility: data.visibility,
    };

    return await activityRepository.create(activity);
};

const getAllByUserorPublic = async (userId) => await activityRepository.findByUserIdOrPublic(userId);

const updateByIdAndUserId = async (userId, activityId, data) => {
    const updated = await activityRepository.updateByIdAndUserId(userId, activityId, {
        user: userId,
        name: data.name,
        caloriesPerHour: data.caloriesPerHour,
        visibility: data.visibility,
    });

    if (!updated) throw new BadRequestError('Failed to update activity');
    return updated;
};

const deleteByUserAndId = async (userId, activityId) => {
    const deleted = await activityRepository.deleteByIdAndUserId(userId, activityId);
    if (!deleted) throw new BadRequestError('Failed or missing permissions to delete activity.');
};

module.exports = {
    create,
    getAllByUserorPublic,
    updateByIdAndUserId,
    deleteByUserAndId,
};
