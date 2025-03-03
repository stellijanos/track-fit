const mongoose = require('mongoose');

const activityEntrySchema = new mongoose.Schema(
    {
        trackDay: { type: mongoose.Schema.Types.ObjectId, ref: 'TrackDay' },
        activity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Activity',
        },
        calories: { type: Number, required: true, min: 0 },
        duration: { type: Number, required: true, min: 0 },
    },
    {
        timestamps: true,
    }
);

activityEntrySchema.index({ trackDay: -1, activity: 1 });

module.exports = mongoose.model('ActivityEntry', activityEntrySchema);
