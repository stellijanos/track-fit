const caloricTargetRepository = require('../repositories/caloricTargetRepository');

const create = async (userId, data) =>
    await caloricTargetRepository.create({
        user: userId,
        name: data.name,
        kcal: data.kcal,
        protein: data.protein,
        carb: data.carb,
        fat: data.fat,
        proteinPerKg: data.proteinPerKg,
        carbPerKg: data.carbPerKg,
        fatPerKg: data.fatPerKg,
    });

const getAllByUserId = async (userId) => await caloricTargetRepository.getAllByUserId(userId);

const rename = async (id, userId, name) => await caloricTargetRepository.updateByIdAndUserId(id, userId, { name });

module.exports = {
    create,
    getAllByUserId,
    rename
};
