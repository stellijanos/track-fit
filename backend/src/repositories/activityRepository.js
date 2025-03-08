const visibility = require('../enums/visbility');
const Activity = require('../models/Activity');

const createOne = async (activity) => await Activity.create(activity);
const findByUserOrPublic = async (userId) =>
    await Activity.find({
        $or: [{ user: userId }, { visibility: visibility.PUBLIC }],
    });

module.exports = {
    createOne,
    findByUserOrPublic,
};
