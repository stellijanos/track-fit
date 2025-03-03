const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        weight: { type: Number, required: true, min: 0 },
        bodyFatPercentage: { type: Number, default: -1, min: -1, max: 100 },
        skeletalMuscleMass: { type: Number, default: -1, min: -1 },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Measurement', measurementSchema);
