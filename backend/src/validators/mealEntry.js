const Joi = require('joi');
const objectId = require('./objectId');
const mealTypes = require('../enums/mealTypes');

const type = Joi.string().valid(...Object.values(mealTypes));
const date = Joi.date().required();
const mealEntryId = objectId('Meal entry id');

const create = Joi.object({
    date,
    type: type.required(),
    description: Joi.string().required(),
});

const get = Joi.object({
    date,
});

const update = Joi.object({
    type,
    date,
    mealEntryId,
    name: Joi.string(),
    quantity: Joi.number(),
}).min(1);

const remove = Joi.object({ date, mealEntryId });

module.exports = {
    create,
    get,
    update,
    remove,
};
