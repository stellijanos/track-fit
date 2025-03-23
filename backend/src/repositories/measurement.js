const Measurement = require('../models/Measurement');

const createOne = async (data) => await Measurement.create(data);

const findAllByUserId = async (userId) => await Measurement.find({ user: userId });

const updateByIdAndUserId = async (id, userId, data) =>
    await Measurement.findOneAndUpdate({ _id: id, user: userId }, { $set: data }, { new: true });

const deleteByIdAndUserId = async (id, userId) =>
    await Measurement.findOneAndDelete({
        _id: id,
        user: userId,
    });

const getLastMeasurementByUserId = async (userId) =>
    await Measurement.findOne({ user: userId }).sort({ createdAt: -1 }).limit(1);

module.exports = {
    createOne,
    findAllByUserId,
    updateByIdAndUserId,
    deleteByIdAndUserId,
    getLastMeasurementByUserId
};
