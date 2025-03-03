const mongoose = require('mongoose');

const gymPlanSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        description: { type: String, default: null },
        from: { type: Date, required: true },
        until: { type: Date, required: true },
        gymDays: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GymDay' }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('GymPlan', gymPlanSchema);
