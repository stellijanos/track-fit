const mongoose = require('mongoose');
const visibility = require('../enums/visbility');

const mealSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        kcal: { type: Number, required: true },
        protein: { type: Number, required: true },
        carb: { type: Number, required: true },
        fat: { type: Number, required: true },
        fibres: { type: Number, default: -1 },
        salt: { type: Number, default: -1 },
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
