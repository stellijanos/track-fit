const Joi = require('joi');
const objectId = require('./objectId');

const date = Joi.date().required();

const get = Joi.object({
    date,
});

const addEntry = Joi.object({
    date,
    quantity: Joi.number().min(1).required(),
});

const deleteEntry = Joi.object({
    date,
    entryId: objectId('Entry id'),
});

module.exports = {
    get,
    addEntry,
    deleteEntry,
};
