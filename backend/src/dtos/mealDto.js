const Joi = require('joi');
const visibility = require('../enums/visbility');

const mealRequestDTO = Joi.object({
    name: Joi.string().required(),
    isCustom: Joi.boolean(),
    kcalPer100G: Joi.number().min(0).required(),
    proteinPer100G: Joi.number().min(0).required(),
    carbPer100G: Joi.number().min(0).required(),
    fatPer100G: Joi.number().min(0).required(),
    fibrePer100G: Joi.number().min(0),
    saltPer100G: Joi.number().min(0),
    visibility: Joi.string().valid(...Object.values(visibility)),
});

const mealResponseDTO = (meal) => {
    return {
        id: meal._id,
        name: meal.name,
        isCustom: meal.isCustom,
        kcalPer100G: meal.kcalPer100G,
        proteinPer100G: meal.proteinPer100G,
        carbPer100G: meal.carbPer100G,
        fatPer100G: meal.fatPer100G,
        fibrePer100G: meal.fibrePer100G,
        saltPer100G: meal.saltPer100G,
        visibility: meal.visibility,
        createdAt: meal.createdAt,
        updatedAt: meal.updatedAt,
    };
};

module.exports = {
    mealRequestDTO,
    mealResponseDTO,
};
