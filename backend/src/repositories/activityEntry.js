const ActivityEntry = require('../models/ActivityEntry');

const create = async (data) => await ActivityEntry.create(data);
const findAllByTrackDayId = async (trackDayId) => await ActivityEntry.find({ trackDay: trackDayId });
const updateById = async (id, date) => await ActivityEntry.findByIdAndUpdate(id, { $set: date }, { new: true });
const findByIdAndTrackDayId = async (id, trackDayId) => await ActivityEntry.findOne({ _id: id, trackDay: trackDayId });
const deleteByIdAndTrackDayId = async (id, trackDayId) => await ActivityEntry.findOneAndDelete({ _id: id, trackDay: trackDayId });

module.exports = {
    create,
    findAllByTrackDayId,
    updateById,
    findByIdAndTrackDayId,
    deleteByIdAndTrackDayId,
};
