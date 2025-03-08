const Joi = require('joi');
const visibility = require('../enums/visbility');

const activityRequestDTO = Joi.object({
    name: Joi.string().required(),
    caloriesPerHour: Joi.number().min(1).required(),
    visibility: Joi.string().valid(...Object.values(visibility)),
});

const activityResponseDTO = (activity) => {
    return {
        id: activity._id,
        name: activity.name,
        caloriesPerHour: activity.calories,
        visibility: activity.visibility,
        createdAt: activity.createdAt,
        updatedAt: activity.updatedAt,
    };
};

module.exports = {
    activityRequestDTO,
    activityResponseDTO,
};
