const MealPlan = require('../models/MealPlan');

const create = async (data) => await MealPlan.create(data);

const findAllPreviewByUserId = async (userId) =>
    await MealPlan.find({ user: userId }).select(
        ' user name type preference mealsPerDay restrictions preferredFoods excludedFoods createdAt'
    );

const findAllByUserId = async (userId) =>
    await MealPlan.find({ user: userId }).sort({ createdAt: 1 });

const findByIdAndUserId = async (id, userId) => await MealPlan.findOne({ _id: id, user: userId });

const deleteByIdAndUserId = async (id, userId) =>
    await MealPlan.findOneAndDelete({ _id: id, user: userId });

module.exports = {
    create,
    findAllPreviewByUserId,
    findAllByUserId,
    findByIdAndUserId,
    deleteByIdAndUserId,
};
