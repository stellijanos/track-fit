const ActivityEntry = require('../models/ActivityEntry');

const create = async (data) => await ActivityEntry.create(data);

const findAllByUserId = async (userId) => await ActivityEntry.find({ user: userId });

const findAllByUserIdBetweenDates = async (userId, from, until) =>
    await ActivityEntry.find({
        user: userId,
        date: {
            $gte: new Date(from),
            $lte: new Date(until),
        },
    });

const findAllByDateAndUserId = async (date, userId) =>
    await ActivityEntry.find({ date, user: userId });

const findByIdAndDateAndUserId = async (id, date, userId) =>
    await ActivityEntry.findOne({ _id: id, date, user: userId });

const updateByIdAndDateAndUserId = async (id, date, userId, data) =>
    await ActivityEntry.findOneAndUpdate(
        { _id: id, date, user: userId },
        { $set: data },
        { new: true }
    );

const deleteByIdAndDateAndUserId = async (id, date, userId) =>
    await ActivityEntry.findOneAndDelete({ _id: id, date, user: userId });

module.exports = {
    create,
    findAllByUserId,
    findAllByUserIdBetweenDates,
    findAllByDateAndUserId,
    findByIdAndDateAndUserId,
    updateByIdAndDateAndUserId,
    deleteByIdAndDateAndUserId,
};
