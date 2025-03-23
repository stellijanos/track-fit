const MealEntry = require('../models/MealEntry');

const create = async (data) => await MealEntry.create(data);

const createMany = async (data) => await MealEntry.insertMany(data);

const findAllByTrackDayId = async (trackDayId) => await MealEntry.find({ trackDay: trackDayId });

const findById = async (mealEntryId) => await MealEntry.findById(mealEntryId);

const updateById = async (id, data) => await MealEntry.findByIdAndUpdate(id, { $set: data }, { new: true });

const deleteByIdAndTrackDayId = async (id, trackDayId) =>
    await MealEntry.findOneAndDelete({ _id: id, trackDay: trackDayId });

module.exports = {
    create,
    createMany,
    findAllByTrackDayId,
    findById,
    updateById,
    deleteByIdAndTrackDayId
};
