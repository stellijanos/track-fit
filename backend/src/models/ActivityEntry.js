const mongoose = require('mongoose');

const activityEntrySchema = new mongoose.Schema(
    {
        date: { type: Date, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        caloriesPerHour: { type: Number, required: true, min: 0 },
        totalCalories: { type: Number, required: true, min: 0 },
        durationInM: { type: Number, required: true, min: 0 },
    },
    {
        timestamps: true,
    }
);

activityEntrySchema.index({ date: -1, user: 1 });

module.exports = mongoose.model('ActivityEntry', activityEntrySchema);
