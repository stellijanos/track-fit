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


module.exports = {
    create
}