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

module.exports = {
    createOne,
    getAllByUserorPublic,
};
