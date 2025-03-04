const mongoose = require('mongoose');
const gymExerciseEntrySchema = require('../schemas/GymExerciseEntrySchema');

const gymDayEntrySchema = new mongoose.Schema(
    {
        trackDay: { type: mongoose.Schema.Types.ObjectId, ref: 'TrackDay' },
        gymPlan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'GymPlan',
        },
        name: { type: String, default: null },
        description: { type: Strinh, default: null },
        duration: { type: Number, required: true, min: 0 },
        calories: { type: Number, required: true, min: 0 },
        exercises: [gymExerciseEntrySchema],
    },
    {
        timestamps: true,
    }
);

gymDayEntrySchema.index({ trackDay: -1 });

module.exports = mongoose.model('GymDayEntry', gymDayEntrySchema);
