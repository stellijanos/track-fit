const Measurement = require('../models/Measurement');

const createOne = async (data) => await Measurement.create(data);

module.exports = {
    createOne,
};
