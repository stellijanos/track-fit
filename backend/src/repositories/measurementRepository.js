const Measurement = require('../models/Measurement');

const createOne = async (data) => await Measurement.create(data);

const findAllByUserId = async(userId) => await Measurement.find({user: userId});

module.exports = {
    createOne,
    findAllByUserId
};
