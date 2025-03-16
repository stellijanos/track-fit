const Joi = require('joi');

const date = Joi.date().required().messages({
    'date.base': 'Invalid date provided.',
    'any.required': 'Date is required.',
});

const quantity = Joi.number().min(1).required();

const create = Joi.object({
    date,
});

const addWaterIntake = Joi.object({
    date,
    quantity,
});

module.exports = {
    create,
    addWaterIntake,
};
