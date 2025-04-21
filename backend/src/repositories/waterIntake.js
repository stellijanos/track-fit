const WaterIntake = require('../models/WaterIntake');

const findAllByUserId = async (userId) =>
    await WaterIntake.find({ user: userId }).sort({ date: 1 });

const findAllByUserIdBetweenDates = async (userId, from, until) =>
    await WaterIntake.find({
        user: userId,
        date: {
            $gte: new Date(from),
            $lte: new Date(until),
        },
    }).sort({ date: 1 });

const findIntakeByDateAndUserId = async (date, userId) =>
    await WaterIntake.findOne({ date, user: userId });

const deleteIntakeByDateAndUserId = async (date, userId) =>
    await WaterIntake.findOneAndDelete({ date, user: userId });

const createEntryByDateAndUserId = async (date, userId, data) =>
    await WaterIntake.findOneAndUpdate(
        { date, user: userId },
        { $push: { entries: data } },
        { new: true, upsert: true }
    );

const deleteEntryByIdDateAndUserId = async (id, date, userId) =>
    await WaterIntake.findOneAndUpdate(
        { date, user: userId },
        { $pull: { entries: { _id: id } } },
        { new: true }
    );

module.exports = {
    findAllByUserId,
    findAllByUserIdBetweenDates,
    findIntakeByDateAndUserId,
    deleteIntakeByDateAndUserId,
    createEntryByDateAndUserId,
    deleteEntryByIdDateAndUserId,
};
