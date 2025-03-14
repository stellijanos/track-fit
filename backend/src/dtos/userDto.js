const Joi = require('joi');
const genders = require('../enums/genders');

const response = (user) => {
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        gender: user.gender,
        height: user.height,
        role: user.role,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        profilePicture: user.profilePicture,
        lastMeasurement: user.lastMeasurement,
        currentWaterTarget: user.currentWaterTarget,
        currentCaloricTarget: user.currentCaloricTarget,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

const updateMe = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
        .pattern(/^\+40\d{9}$/)
        .messages({
            'string.pattern.base': 'Phone number must start with +40 and have exactly 9 digits after.',
        }),
    birthDate: Joi.date(),
    gender: Joi.string().valid(...Object.values(genders)),
    height: Joi.number(),
}).min(1);

module.exports = {
    response,
    updateMe,
};
