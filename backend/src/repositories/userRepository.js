const User = require('../models/User');

const createOne = async (data) => await User.create(data);
const findById = async (id) => await User.findById(id);
const findByEmail = async (email) => await User.findOne({ email });
const findByPhone = async (phone) => await User.findOne({ phone });

const findByEmailOrPhone = async (email, phone) =>
    await User.findOne({ $or: [{ email }, { phone }] });

const updateOne = async (id, data) =>
    await User.findByIdAndUpdate(id, data, { new: true });

module.exports = {
    createOne,
    findById,
    findByEmail,
    findByPhone,
    findByEmailOrPhone,
    updateOne,
};
