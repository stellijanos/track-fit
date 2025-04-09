const JoiBase = require('joi');
JoiBase.objectId = require('joi-objectid')(JoiBase);

const Joi = JoiBase;

/**
 * Joi schema to validate a MongoDB ObjectId by dynamic param name.
 * @param {string} name - The parameter name to validate (User id, Measurement id, etc)
 */
module.exports = (name) =>
    Joi.objectId()
        .required()
        .messages({
            'any.required': `${name} is required.`,
            'string.pattern.base': `${name} must be a valid MongoDB ObjectId.`,
        });
