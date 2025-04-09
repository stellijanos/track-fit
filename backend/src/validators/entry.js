const Joi = require('joi');

const getAll = Joi.object({
    date: Joi.date().required(),
});

module.exports = { getAll };
