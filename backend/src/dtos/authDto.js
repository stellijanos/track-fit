const Joi = require('joi');

const resetPassword = Joi.object({
    code: Joi.string().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match.',
    }),
});

module.exports = {
    resetPassword,
};
