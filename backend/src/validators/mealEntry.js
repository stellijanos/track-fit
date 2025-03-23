const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mealTypes = require('../enums/mealTypes');

const date = Joi.date().required();

const create = Joi.object({
    date,
    description: Joi.string().required(),
    type: Joi.string()
        .valid(...Object.values(mealTypes))
        .required(),
});

const update = Joi.object({
    date,
    mealEntryId: Joi.objectId().required().messages({
        'string.pattern.base': 'Invalid activity ID provided.',
        'any.required': 'Activity ID is required.',
    }),
    name: Joi.string(),
    quantity: Joi.number(),
    type: Joi.string().valid(...Object.values(mealTypes)),
}).min(1);

module.exports = {
    create,
    date,
    update,
};
