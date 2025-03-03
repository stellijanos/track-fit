const mongoose = require('mongoose');

const gymDayEntrySchema = new mongoose.Schema(
    {
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'GymExercise' },
        sets: [
            {
                setNumber: { type: Number, required: true },
                nrSets: { type: Number, required: true },
                nrReps: { type: Number, required: true },
                reps: { type: Number, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

gymDayEntrySchema.index({ trackDay: -1 });

module.exports = mongoose.model('gymDayEntry', gymDayEntrySchema);
