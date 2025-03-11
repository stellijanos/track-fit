const mongoose = require('mongoose');
const mealTypes = require('../enums/mealTypes');

const mealPlanSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        meals: [
            {
                meal: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal' },
                type: { type: String, enum: Object.values(mealTypes) },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
