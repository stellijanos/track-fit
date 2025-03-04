const mongoose = require('mongoose');
const gymDaySchema = require('../schemas/GymDaySchema');

const gymPlanSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        description: { type: String, default: null },
        from: { type: Date, default: null },
        until: { type: Date, default: null },
        nrWeeks: { type: Number, default: 12, min: 1 },
        gymDays: [gymDaySchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('GymPlan', gymPlanSchema);
