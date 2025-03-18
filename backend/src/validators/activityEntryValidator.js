const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const create = Joi.object({
    activityId: Joi.objectId().required().messages({
        'string.pattern.base': 'Invalid activity ID provided.',
        'any.required': 'Activity ID is required.',
    }),
    date: Joi.date().required(),
    durationInM: Joi.number().min(1).required(),
});

const getAll = Joi.object({
    date: Joi.date().required(),
});

module.exports = {
    create,
    getAll
};
