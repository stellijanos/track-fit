const MealEntry = require('../models/MealEntry');

const createMany = async (data) => await MealEntry.insertMany(data);

const findAllByUserId = async (userId) => await MealEntry.find({ user: userId }).sort({ date: 1 });

const findAllByDateAndUserId = async (date, userId) => await MealEntry.find({ date, user: userId });

const findAllByUserIdBetweenDates = async (userId, from, until) =>
    await MealEntry.find({
        user: userId,
        date: {
            $gte: new Date(from),
            $lte: new Date(until),
        },
    }).sort({ date: 1 });

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
    findAllByUserId,
    findAllByDateAndUserId,
    findAllByUserIdBetweenDates,
    findByIdAndDateAndUserId,
    updateByIdAndDateAndUserId,
    deleteByIdAndDateAndUserId,
};
