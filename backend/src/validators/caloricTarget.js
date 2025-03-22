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


module.exports = {
    create,
    update,
};
