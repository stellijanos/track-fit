const mongoose = require('mongoose');
const mealTimes = require('../enums/mealTimes');

const mealEntrySchema = new mongoose.Schema(
    {
        trackDay: { type: mongoose.Schema.Types.ObjectId, ref: 'TrackDay' },
        name: { type: String, required: true },
        mealTime: {
            type: String,
            enum: Object.values(mealTimes),
            default: mealTimes.SNACK,
        },
        per100G: {
            kcal: { type: Number, required: true },
            protein: { type: Number, required: true },
            carb: { type: Number, required: true },
            fat: { type: Number, required: true },
            fibre: { type: Number, required: true },
            salt: { type: Number, required: true },
        },
        totalConsumed: {
            quantityInG: { type: Number, required: true },
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

mealEntrySchema.index({ trackDay: -1, meal: 1, mealTime: 1 }, { unique: true });

module.exports = mongoose.model('MealEntry', mealEntrySchema);
