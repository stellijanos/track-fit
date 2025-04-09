const mongoose = require('mongoose');

const waterIntakeSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    entries: [
        {
            date: { type: Date, default: Date.now },
            quantity: { type: Number, required: true },
        },
    ],
});

waterIntakeSchema.index({ date: -1, user: 1 }, { unique: true });

module.exports = mongoose.model('WaterIntake', waterIntakeSchema);
