const activityRepository = require('../repositories/activityRepository');

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

module.exports = {
    createOne,
    getAllByUserorPublic,
    updateOne,
};
