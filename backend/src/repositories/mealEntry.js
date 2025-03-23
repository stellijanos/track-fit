const MealEntry = require('../models/MealEntry');

const create = async (data) => await MealEntry.create(data);

const createMany = async (data) => await MealEntry.insertMany(data);

const findAllByTrackDayId = async (trackDayId) => await MealEntry.find({ trackDay: trackDayId });

module.exports = {
    create,
    createMany,
    findAllByTrackDayId
};
