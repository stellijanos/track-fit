const mongoose = require('mongoose');
const mealTypes = require('../enums/mealTypes');
const dietaryPreferences = require('../enums/dietaryPreferences');
const dietaryRestrictions = require('../enums/dietaryRestrictions');
const mealsPerDay = require('../enums/mealsPerDay');
const mealPlanTypes = require('../enums/mealPlanTypes');

const mealPlanSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        type: {type: String, enum: Object.values(mealPlanTypes)},
        preference: { type: String, enum: Object.values(dietaryPreferences) },
        mealsPerDay: {type: Number, enum: mealsPerDay},
        restrictions: [{ type: String, enum: Object.values(dietaryRestrictions) }],
        preferredFoods: { type: String, default: null },
        excludedFoods: { type: String, default: null },
        days: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                dailyCaloricTarget: { type: Number, required: true },
                dailyMacros: {
                    protein: { type: Number, required: true },
                    carb: { type: Number, required: true },
                    fat: { type: Number, required: true },
                },
                meals: [
                    {
                        name: { type: String, required: true },
                        description: { type: String, required: true },
                        type: { type: String, enum: Object.values(mealTypes) },
                        kcal: { type: Number, required: true },
                        protein: { type: Number, required: true },
                        carb: { type: Number, required: true },
                        fat: { type: Number, required: true },
                        fibre: { type: Number, required: true },
                        salt: { type: Number, required: true },
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
