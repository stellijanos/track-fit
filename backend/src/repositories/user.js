const User = require('../models/User');

const createOne = async (data) => await User.create(data);
const findById = async (id) => await User.findById(id).populate('lastMeasurement currentCaloricTarget');
const findByEmail = async (email) => await User.findOne({ email });
const findByPhone = async (phone) => await User.findOne({ phone });

const findByEmailOrPhone = async (email, phone) => await User.findOne({ $or: [{ email }, { phone }] });

const updateById = async (id, data) => await User.findByIdAndUpdate(id, { $set: data }, { new: true });

const deleteById = async (id) => await User.findByIdAndDelete(id);

module.exports = {
    createOne,
    findById,
    findByEmail,
    findByPhone,
    findByEmailOrPhone,
    updateById,
    deleteById,
};
