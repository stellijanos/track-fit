const mongoose = require('mongoose');

const measurementSchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        weight: { type: Number, required: true, min: 0 },
        bodyFatPercentage: { type: Number, default: -1, min: -1, max: 100 },
        skeletalMuscleMass: { type: Number, default: -1, min: -1 },
    },
    {
        timestamps: true,
    }
);

measurementSchema.index({ date: -1, user: 1 });

module.exports = mongoose.model('Measurement', measurementSchema);
