const Joi = require('joi');
const genders = require('../enums/genders');

const register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^\+40\d{9}$/)
        .required(),
    birthDate: Joi.date().required(),
    gender: Joi.string()
        .valid(...Object.values(genders))
        .required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
    }),
});

const resetPassword = Joi.object({
    code: Joi.string().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
    }),
});

module.exports = {
    register,
    resetPassword,
};
