const visibility = require('../enums/visbility');
const Activity = require('../models/Activity');

const createOne = async (activity) => await Activity.create(activity);
const findByUserOrPublic = async (userId) =>
    await Activity.find({
        $or: [{ user: userId }, { visibility: visibility.PUBLIC }],
    });

const updateOneByUserAndId = async (userId, activityId, data) =>
    await Activity.findOneAndUpdate({ user: userId, _id: activityId }, data, {
        new: true,
        runValidators: true,
    });

const deleteByUserAndId = async (userId, activityId) =>
    await Activity.findOneAndDelete({ _id: activityId, user: userId });

module.exports = {
    createOne,
    findByUserOrPublic,
    updateOneByUserAndId,
    deleteByUserAndId,
};
