const mongoose = require('mongoose');

const gymExerciseEntrySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        sets: [
            {
                setNumber: { type: Number, required: true },
                nrSets: { type: Number, required: true },
                nrReps: { type: Number, required: true },
                note: { type: String, default: null },
            },
        ],
    },
    {
        _id: false,
    }
);

module.exports = gymExerciseEntrySchema;
