const MealPlan = require('../models/MealPlan');

const create = async (data) => await MealPlan.create(data);

module.exports = {
    create,
};
