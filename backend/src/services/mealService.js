const mealRepository = require('../repositories/mealRepository');

const createOne = async (userId, data) => {
    const meal = {
        user: userId,
        name: data.name,
        kcalPer100G: data.kcalPer100G,
        proteinPer100G: data.proteinPer100G,
        carbPer100G: data.carbPer100G,
        fatPer100G: data.fatPer100G,
        fibrePer100G: data.fibrePer100G,
        saltPer100G: data.saltPer100G,
        visibility: data.visibility,
    };

    return await mealRepository.createOne(meal);
};

const getAllByUserOrPublic = async (userId) =>
    await mealRepository.findAllByUserOrPublic(userId);

module.exports = {
    createOne,
    getAllByUserOrPublic,
};
