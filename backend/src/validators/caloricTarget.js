const Joi = require('joi');
const activityLevels = require('../enums/activityLevels');
const physicalGoals = require('../enums/physicalGoals');
const goalSpeed = require('../enums/goalSpeed');

const create = Joi.object({
    activityLevel: Joi.string()
        .valid(...Object.values(activityLevels))
        .required(),
    physicalGoal: Joi.string()
        .valid(...Object.values(physicalGoals))
        .required(),
    goalSpeed: Joi.string()
        .valid(...Object.values(goalSpeed))
        .required(),
});

module.exports = {
    create,
};
