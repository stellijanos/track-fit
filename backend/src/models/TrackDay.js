const mongoose = require('mongoose');

const trackDaySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, required: true },
        caloricTarget: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CaloricTarget',
        },
        waterIntake: { type: Number, default: 0 },
        waterTarget: { type: Number, min: 0, required: true },
    },
    {
        timestamps: true,
    }
);

trackDaySchema.index({ user: 1, date: -1 }, { unique: true });

module.exports = mongoose.model('TrackDay', trackDaySchema);
