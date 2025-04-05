const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const date = Joi.date().required();
const activityEntryId = Joi.objectId().required().messages({
    'string.pattern.base': 'Invalid activity ID provided.',
    'any.required': 'Activity ID is required.',
});

const create = Joi.object({
    date,
    name: Joi.string().required(),
    durationInM: Joi.number().min(1).max(1440).required(),
    additionalInfo: Joi.string().required(),
});

const getAll = Joi.object({
    date,
});

const update = Joi.object({
    date,
    activityEntryId,
    name: Joi.string(),
    durationInM: Joi.number().min(1).max(1440),
});

const deleteById = Joi.object({
    date,
    activityEntryId,
});

module.exports = {
    create,
    getAll,
    update,
    deleteById,
};
