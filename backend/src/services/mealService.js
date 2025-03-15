const BadRequestError = require('../errors/BadRequestError');
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

const getAllByUserOrPublic = async (userId) => await mealRepository.findAllByUserOrPublic(userId);

const updateByUserAndId = async (userId, mealId, data) => {
    const updated = await mealRepository.updateByUserAndId(userId, mealId, {
        name: data.name,
        kcalPer100G: data.kcalPer100G,
        proteinPer100G: data.proteinPer100G,
        carbPer100G: data.carbPer100G,
        fatPer100G: data.fatPer100G,
        fibrePer100G: data.fibrePer100G,
        saltPer100G: data.saltPer100G,
        visibility: data.visibility,
    });
    if (!updated) throw new BadRequestError('Failed to update meal: not found or missing permissions');
    return updated;
};

const deleteByUserAndId = async (userId, mealId) => {
    const deleted = await mealRepository.deleteByUserAndId(userId, mealId);
    if (!deleted) throw new BadRequestError('Failed to delete meal: not found or missing permissions');
};

module.exports = {
    createOne,
    getAllByUserOrPublic,
    updateByUserAndId,
    deleteByUserAndId,
};
