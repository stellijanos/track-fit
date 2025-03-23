const mongoose = require('mongoose');
const activityLevels = require('../enums/activityLevels');
const physicalGoals = require('../enums/physicalGoals');
const goalSpeed = require('../enums/goalSpeed');

const caloricTargetSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        activityLevel: {type: String, enum: Object.values(activityLevels)},
        physicalGoal: {type: String, enum: Object.values(physicalGoals)},
        goalSpeed: {type: String, enum: Object.values(goalSpeed)},
        kcal: { type: Number, min: 0 },
        protein: { type: Number, min: 0 },
        carb: { type: Number, min: 0 },
        fat: { type: Number, min: 0 },
        proteinPerKg: { type: Number, min: 0 },
        carbPerKg: { type: Number, min: 0 },
        fatPerKg: { type: Number, min: 0 },
        isLocked: { type: Boolean, default: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('CaloricTarget', caloricTargetSchema);
