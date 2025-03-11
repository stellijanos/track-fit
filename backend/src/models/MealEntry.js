const mongoose = require('mongoose');
const mealTypes = require('../enums/mealTypes');

const mealEntrySchema = new mongoose.Schema(
    {
        trackDay: { type: mongoose.Schema.Types.ObjectId, ref: 'TrackDay' },
        name: { type: String, required: true },
        mealType: {
            type: String,
            enum: Object.values(mealTypes),
            default: mealTypes.SNACK,
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

mealEntrySchema.index({ trackDay: -1, meal: 1, mealType: 1 }, { unique: true });

module.exports = mongoose.model('MealEntry', mealEntrySchema);
