const mongoose = require('mongoose');

const waterTargetSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        quantity: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('WaterTarget', waterTargetSchema);
