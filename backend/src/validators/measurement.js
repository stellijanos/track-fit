const Joi = require('joi');
const objectId = require('./objectId');

const date = Joi.date();
const weight = Joi.number().min(0);
const bodyFatPercentage = Joi.number().min(0).max(100);
const skeletalMuscleMass = Joi.number().min(0);

const measurementId = objectId('Measurement id');

const create = Joi.object({
    date: date.required(),
    weight: weight.required(),
    bodyFatPercentage,
    skeletalMuscleMass,
});

const update = Joi.object({
    measurementId,
    date,
    weight,
    bodyFatPercentage,
    skeletalMuscleMass,
}).min(1);

const remove = Joi.object({ measurementId });

module.exports = {
    create,
    update,
    remove,
};
