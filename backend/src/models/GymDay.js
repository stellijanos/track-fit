const mongoose = require('mongoose');

const gymDaySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        exercises: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'GymExercise' },
        ],
        description: { type: String, default: '' },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('GymDay', gymDaySchema);
