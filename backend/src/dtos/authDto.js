const Joi = require('joi');
const genders = require('../enums/genders');

const register = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^\+40\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must start with +40 and have exactly 9 digits after.',
        }),
    birthDate: Joi.date().required(),
    gender: Joi.string()
        .valid(...Object.values(genders))
        .required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
    }),
});

const login = Joi.object({
    email: Joi.string().email(),
    phone: Joi.string(),
    password: Joi.string().required(),
})
    .or('email', 'phone')
    .messages({ 'object.missing': 'Email or phone is required.' });

const forgotPassword = Joi.object({
    email: Joi.string().required(),
});

const validatePasswordResetCode = Joi.object({
    code: Joi.string().required(),
});

const resetPassword = Joi.object({
    code: Joi.string().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
    }),
});

const changePassword = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required().invalid(Joi.ref('currentPassword')).messages({
        'any.invalid': 'New password cannot be the same as the current one.',
    }),
    newPasswordConfirm: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Passwords do not match.',
    }),
});

const refreshToken = Joi.object({
    refreshToken: Joi.string().required(),
});

module.exports = {
    register,
    login,
    forgotPassword,
    validatePasswordResetCode,
    resetPassword,
    changePassword,
    refreshToken,
};
