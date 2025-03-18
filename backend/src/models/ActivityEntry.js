const mongoose = require('mongoose');

const activityEntrySchema = new mongoose.Schema(
    {
        trackDay: { type: mongoose.Schema.Types.ObjectId, ref: 'TrackDay' },
        name: { type: String, required: true },
        caloriesPerHour: { type: Number, required: true, min: 0 },
        totalCalories: { type: Number, required: true, min: 0 },
        durationInM: { type: Number, required: true, min: 0 },
    },
    {
        timestamps: true,
    }
);

activityEntrySchema.index({ trackDay: -1, activity: 1 });

module.exports = mongoose.model('ActivityEntry', activityEntrySchema);
