const mongoose = require('mongoose');
const visibility = require('../enums/visbility');

const activitySchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        caloriesPerHour: { type: String, required: true, min: 0 },
        visibility: {
            type: String,
            enum: Object.values(visibility),
            default: visibility.PRIVATE,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Activity', activitySchema);
