const MealEntry = require('../models/MealEntry');

const create = async (data) => await MealEntry.create(data);

const createMany = async (data) => await MealEntry.insertMany(data);

module.exports = {
    create,
    createMany,
};
