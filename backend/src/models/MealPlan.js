const mongoose = require('mongoose');
const mealTypes = require('../enums/mealTypes');

const mealPlanSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        meals: [
            {
                name: { type: String, required: true },
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
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('MealPlan', mealPlanSchema);
