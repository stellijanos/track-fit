const TrackDay = require('../models/TrackDay');

const createOrUpdate = async (date, userId, data) =>
    await TrackDay.findOneAndUpdate({ date, user: userId }, { $set: data }, { upsert: true, new: true }).populate(
        'caloricTarget'
    );

module.exports = {
    createOrUpdate,
};
