const MealEntry = require('../models/MealEntry');

const createMany = async (data) => await MealEntry.insertMany(data);

const findAllByDateAndUserId = async (date, userId) => await MealEntry.find({ date, user: userId });

const findByIdAndDateAndUserId = async (id, date, userId) =>
    await MealEntry.findOne({ _id: id, date, user: userId });

const updateByIdAndDateAndUserId = async (id, date, userId, data) =>
    await MealEntry.findOneAndUpdate(
        { _id: id, date, user: userId },
        { $set: data },
        { new: true }
    );

const deleteByIdAndDateAndUserId = async (id, date, userId) =>
    await MealEntry.findOneAndDelete({ _id: id, date, user: userId });

module.exports = {
    createMany,
    findAllByDateAndUserId,
    findByIdAndDateAndUserId,
    updateByIdAndDateAndUserId,
    deleteByIdAndDateAndUserId,
};
