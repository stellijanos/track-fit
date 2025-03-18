const ActivityEntry = require('../models/ActivityEntry');

const create = async (data) => await ActivityEntry.create(data);
const findAllByTrackDayId = async (trackDayId) => await ActivityEntry.find({ trackDay: trackDayId });

module.exports = {
    create,
    findAllByTrackDayId,
};
