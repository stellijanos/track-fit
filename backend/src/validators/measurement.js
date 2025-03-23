const Joi = require('joi');

const create = Joi.object({
    date: Joi.date().required(),
    weight: Joi.number().min(0).required(),
    bodyFatPercentage: Joi.number().min(0).max(100),
    skeletalMuscleMass: Joi.number().min(0),
});

const update = Joi.object({
    weight: Joi.number().min(0),
    bodyFatPercentage: Joi.number().min(0).max(100),
    skeletalMuscleMass: Joi.number().min(0),
}).min(1);

module.exports = {
    create,
    update,
};
