const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const create = Joi.object({
    activityId: Joi.objectId().required().messages({
        'string.pattern.base': 'Invalid activity ID provided.',
        'any.required': 'Activity ID is required.',
    }),
    date: Joi.date().required(),
    durationInM: Joi.number().min(1).max(1440).required(),
});

const getAll = Joi.object({
    date: Joi.date().required(),
});

const update = Joi.object({
    activityEntryId: Joi.objectId().required().messages({
        'string.pattern.base': 'Invalid activity ID provided.',
        'any.required': 'Activity ID is required.',
    }),
    date: Joi.date().required(),
    durationInM: Joi.number().min(1).max(1440).required(),
});

const deleteById = Joi.object({
    activityEntryId: Joi.objectId().required().messages({
        'string.pattern.base': 'Invalid activity ID provided.',
        'any.required': 'Activity ID is required.',
    }),
});

module.exports = {
    create,
    getAll,
    update,
    deleteById,
};
