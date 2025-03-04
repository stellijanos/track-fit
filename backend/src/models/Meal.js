const mongoose = require('mongoose');
const visibility = require('../enums/visbility');

const mealSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        isCustom: {type: Boolean, default: true},
        kcalPer100G: { type: Number, required: true },
        proteinPer100G: { type: Number, required: true },
        carbPer100G: { type: Number, required: true },
        fatPer100G: { type: Number, required: true },
        fibrePer100G: { type: Number, default: null },
        saltPer100G: { type: Number, default: null },
        visibility: {
            type: String,
            enum: Object.values(visibility),
            default: visibility.PRIVATE,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Meal', mealSchema);
