const ActivityEntry = require('../models/ActivityEntry');

const create = async (data) => await ActivityEntry.create(data);
const findAllByTrackDayId = async (trackDayId) => await ActivityEntry.find({ trackDay: trackDayId });
const updateById = async (id, date) => await ActivityEntry.findByIdAndUpdate(id, { $set: date }, { new: true });
const findById = async (id) => await ActivityEntry.findById(id);
const deleteById = async (id) => await ActivityEntry.findByIdAndDelete(id);

module.exports = {
    create,
    findAllByTrackDayId,
    updateById,
    findById,
    deleteById,
};
