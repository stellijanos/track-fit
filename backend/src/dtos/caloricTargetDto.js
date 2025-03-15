const Joi = require('joi');

const create = Joi.object({
    name: Joi.string(),
    kcal: Joi.number().required(),
    protein: Joi.number().required(),
    carb: Joi.number().required(),
    fat: Joi.number().required(),
    proteinPerKg: Joi.number().required(),
    carbPerKg: Joi.number().required(),
    fatPerKg: Joi.number().required(),
});

const update = Joi.object({
    name: Joi.string(),
}).min(1);

const response = (data) => {
    return {
        id: data._id,
        name: data.name,
        kcal: data.kcal,
        protein: data.protein,
        carb: data.carb,
        fat: data.fat,
        proteinPerKg: data.proteinPerKg,
        carbPerKg: data.carbPerKg,
        fatPerKg: data.fatPerKg,
    };
};

module.exports = {
    create,
    update,
    response,
};
