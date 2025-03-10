const WaterTarget = require('../models/WaterTarget');

const create = async (data) => await WaterTarget.create(data);

module.exports = {
    create,
};
