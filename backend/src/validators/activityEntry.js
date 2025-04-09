const Joi = require('joi');
const objectId = require('./objectId');

const name = Joi.string();
const date = Joi.date().required();
const durationInM = Joi.number().min(1).max(1440);

const activityEntryId = objectId('Activity entry id');

const create = Joi.object({
    date,
    name: name.required(),
    durationInM: durationInM.required(),
    additionalInfo: Joi.string().required(),
});

const getAll = Joi.object({ date });
const update = Joi.object({ date, activityEntryId, name, durationInM });
const deleteById = Joi.object({ date, activityEntryId });

module.exports = {
    create,
    getAll,
    update,
    deleteById,
};
