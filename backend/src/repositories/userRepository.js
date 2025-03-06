const User = require('../models/User');

const createOne = async (data) => await User.create(data);
const getByEmail = async (email) => await User.findOne({ email });
const getByPhone = async (phone) => await User.findOne({ phone });

const getByEmailOrPhone = async (email, phone) =>
    await User.findOne({ $or: [{ email }, { phone }] });

const updateOne = async (user) => await user.save();

module.exports = {
    createOne,
    getByEmail,
    getByPhone,
    getByEmailOrPhone,
    updateOne,
};
