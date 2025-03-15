const Joi = require('joi');

const create = Joi.object({
    weight: Joi.number().min(0).required(),
    bodyFatPercentage: Joi.number().min(0).max(100),
    skeletalMuscleMass: Joi.number().min(0),
});

const update = Joi.object({
    weight: Joi.number().min(0),
    bodyFatPercentage: Joi.number().min(0).max(100),
    skeletalMuscleMass: Joi.number().min(0),
}).min(1);

const response = (data) => {
    return {
        id: data._id,
        weight: data.weight,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.bodyFatPercentage,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};

module.exports = {
    create,
    update,
    response,
};
