const Joi = require('joi');
const visibility = require('../enums/visbility');

const create = Joi.object({
    name: Joi.string().required(),
    caloriesPerHour: Joi.number().min(1).required(),
    visibility: Joi.string().valid(...Object.values(visibility)),
});

const update = Joi.object({
    name: Joi.string(),
    caloriesPerHour: Joi.number().min(1),
    visibility: Joi.string().valid(...Object.values(visibility)),
}).min(1);

const response = (activity) => {
    return {
        id: activity._id,
        name: activity.name,
        caloriesPerHour: activity.caloriesPerHour,
        visibility: activity.visibility,
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt,
    };
};

module.exports = {
    create,
    update,
    response,
};
