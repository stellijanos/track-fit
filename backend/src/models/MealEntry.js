const mongoose = require('mongoose');
const mealTypes = require('../enums/mealTypes');

const mealEntrySchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        type: { type: String, enum: Object.values(mealTypes) },
        per100: {
            kcal: { type: Number, required: true },
            protein: { type: Number, required: true },
            carb: { type: Number, required: true },
            fat: { type: Number, required: true },
            fibre: { type: Number, required: true },
            salt: { type: Number, required: true },
        },
        totalConsumed: {
            quantity: { type: Number, required: true },
            kcal: { type: Number, required: true },
            protein: { type: Number, required: true },
            carb: { type: Number, required: true },
            fat: { type: Number, required: true },
            fibre: { type: Number, required: true },
            salt: { type: Number, required: true },
        },
    },
    {
        timestamps: true,
    }
);

mealEntrySchema.index({ date: -1, user: 1 });
mealEntrySchema.index({ date: -1, user: 1, type: 1 });

module.exports = mongoose.model('MealEntry', mealEntrySchema);
