const Joi = require('joi');
const mealTypes = require('../enums/mealTypes');

const create = Joi.object({
    date: Joi.date().required(),
    description: Joi.string().required(),
    type: Joi.string()
        .valid(...Object.values(mealTypes))
        .required(),
});

module.exports = {
    create,
};
