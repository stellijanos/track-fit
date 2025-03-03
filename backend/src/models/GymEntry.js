const mongoose = require('mongoose');

const gymDayEntrySchema = new mongoose.Schema(
    {
        trackDay: { type: mongoose.Schema.Types.ObjectId, ref: 'TrackDay' },
        gymPlan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GymPlan',
        },
        gymDay: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GymDay',
        },
        name: { type: String, default: null },
        description: { type: Strinh, default: null },
        calories: { type: Number, required: true, min: 0 },
        duration: { type: Number, required: true, min: 0 },
        exercises: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'GymExerciseEntry' },
        ],
    },
    {
        timestamps: true,
    }
);

gymDayEntrySchema.index({ trackDay: -1 });

module.exports = mongoose.model('gymDayEntry', gymDayEntrySchema);
