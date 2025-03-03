const mongoose = require('mongoose');

const gymExerciseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        nrSets: { type: Number, required: true, min: 1 },
        nrReps: { type: Number, required: true, min: 1 },
        restBetweenSets: { type: Number, default: 30, min: 0 },
        description: { type: String, default: null },
        duration: { type: Number, default: null },
        weight: { type: Number, default: null },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('GymExercise', gymExerciseSchema);
