const Joi = require('joi');
const mealTypes = require('../enums/mealTypes');

const date = Joi.date().required();

const create = Joi.object({
    date,
    description: Joi.string().required(),
    type: Joi.string()
        .valid(...Object.values(mealTypes))
        .required(),
});

module.exports = {
    create,
    date,
};
