const Activity = require('../models/Activity');

const createOne = async (activity) => await Activity.create(activity);

module.exports = {
    createOne,
};
