const CaloricTarget = require('../models/CaloricTarget');

const create = async (data) => await CaloricTarget.create(data);

const findById = async (id) => await CaloricTarget.findById(id);

const findAllByUserId = async (userId) => await CaloricTarget.find({ user: userId });

const findAllByUserIdBetweenDates = async (userId, from, until) =>
    await CaloricTarget.find({
        user: userId,
        createdAt: {
            $gte: new Date(from),
            $lte: new Date(until),
        },
    });

const updateByIdAndUserId = async (id, userId, data) =>
    await CaloricTarget.findOneAndUpdate(
        { _id: id, user: userId },
        { $set: data },
        { new: true, runValidators: true }
    );

const deleteByIdAndUserId = async (id, userId) =>
    await CaloricTarget.findOneAndDelete({ _id: id, user: userId });

module.exports = {
    create,
    findById,
    findAllByUserId,
    findAllByUserIdBetweenDates,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
