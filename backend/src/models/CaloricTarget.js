const mongoose = require('mongoose');

const caloricTargetSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        kcal: { type: Number, min: 0 },
        protein: { type: Number, min: 0 },
        carb: { type: Number, min: 0 },
        fat: { type: Number, min: 0 },
        proteinPerKg: { type: Number, min: 0 },
        carbPerKg: { type: Number, min: 0 },
        fatPerKg: { type: Number, min: 0 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('CaloricTarget', caloricTargetSchema);
