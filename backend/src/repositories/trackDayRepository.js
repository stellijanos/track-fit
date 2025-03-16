const TrackDay = require('../models/TrackDay');

const createOrUpdate = async (date, userId, data, session = null) =>
    await TrackDay.findOneAndUpdate(
        { date, user: userId },
        { $set: data },
        { upsert: true, new: true, session }
    ).populate('caloricTarget');

module.exports = {
    createOrUpdate,
};
