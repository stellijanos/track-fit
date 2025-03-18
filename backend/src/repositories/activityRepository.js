const visibility = require('../enums/visbility');
const Activity = require('../models/Activity');

const create = async (activity) => await Activity.create(activity);

const findById = async (id) => await Activity.findById(id);

const findByUserIdOrPublic = async (userId) =>
    await Activity.find({ $or: [{ user: userId }, { visibility: visibility.PUBLIC }] });

const updateByIdAndUserId = async (userId, activityId, data) =>
    await Activity.findOneAndUpdate({ user: userId, _id: activityId }, data, { new: true, runValidators: true });

const deleteByIdAndUserId = async (userId, activityId) =>
    await Activity.findOneAndDelete({ _id: activityId, user: userId });

module.exports = {
    create,
    findById,
    findByUserIdOrPublic,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
