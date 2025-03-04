const mongoose = require('mongoose');

const gymExerciseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: null },
        nrSets: { type: Number, required: true, min: 1 },
        nrReps: { type: Number, required: true, min: 1 },
        restBetweenSets: { type: Number, default: 30, min: 0 },
        duration: { type: Number, default: null },
        weight: { type: Number, default: null },
    },
    {
        _id: false,
    }
);

module.exports = gymExerciseSchema;
