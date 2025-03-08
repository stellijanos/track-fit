const visibility = require('../enums/visbility');
const Meal = require('../models/Meal');

const createOne = async (data) => await Meal.create(data);

const findAllByUserOrPublic = async (userId) =>
    await Meal.find({
        $or: [{ user: userId }, { visibility: visibility.PUBLIC }],
    });

const updateByUserAndId = async (userId, mealId, data) =>
    await Meal.findOneAndUpdate({ _id: mealId, user: userId }, data, {
        new: true,
    });

module.exports = {
    createOne,
    findAllByUserOrPublic,
    updateByUserAndId,
};
