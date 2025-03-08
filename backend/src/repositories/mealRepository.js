const visibility = require('../enums/visbility');
const Meal = require('../models/Meal');

const findAllByUserOrPublic = async (userId) =>
    await Meal.find({
        $or: [{ user: userId }, { visibility: visibility.PUBLIC }],
    });

module.exports = {
    findAllByUserOrPublic,
};
