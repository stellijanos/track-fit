const Joi = require('joi');

const measurementRequestDTO = Joi.object({
    weight: Joi.number().min(0).required(),
    bodyFatPercentage: Joi.number().min(0).max(100),
    skeletalMuscleMass: Joi.number().min(0),
});

const measurementResponseDTO = (data) => {
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
    measurementRequestDTO,
    measurementResponseDTO,
};
