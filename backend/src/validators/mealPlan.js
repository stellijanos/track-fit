const Joi = require('joi');

const dietaryPreferences = require('../enums/dietaryPreferences');
const dietaryRestrictions = require('../enums/dietaryRestrictions');
const mealPlanTypes = require('../enums/mealPlanTypes');
const mealsPerDay = require('../enums/mealsPerDay');

const create = Joi.object({
    dailyMealPrepTime: Joi.number().required(),
    mealsPerDay: Joi.number().valid(...mealsPerDay).required(),
    planType: Joi.string()
        .valid(...Object.values(mealPlanTypes))
        .required(),
    preference: Joi.string()
        .valid(...Object.values(dietaryPreferences))
        .required(),
    restrictions: Joi.array().items(Joi.string().valid(...Object.values(dietaryRestrictions))),
    preferredFoods: Joi.string().allow('').optional(),
    excludedFoods: Joi.string(),
    otherAllergies: Joi.string(),
    notes: Joi.string(),
});

module.exports = {
    create,
};
