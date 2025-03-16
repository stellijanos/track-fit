const Joi = require('joi');

const date = Joi.date().required().messages({
    'date.base': 'Invalid date provided.',
    'any.required': 'Date is required.',
});

module.exports = {
    date,
};
