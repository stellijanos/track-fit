const WaterTarget = require('../models/WaterTarget');

const create = async (data) => await WaterTarget.create(data);

const findAllByUserId = async (userId) =>
    await WaterTarget.find({ user: userId });

module.exports = {
    create,
    findAllByUserId,
};
