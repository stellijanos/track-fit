const mongoose = require('mongoose');

const gymExerciseEntrySchema = new mongoose.Schema(
    {
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'GymExercise' },
        sets: [
            {
                setNumber: { type: Number, required: true },
                nrSets: { type: Number, required: true },
                nrReps: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('GymExerciseEntry', gymExerciseEntrySchema);
