const mongoose = require('mongoose');
const gymExerciseSchema = require('./GymExerciseSchema');

const gymDaySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: null },
        exercises: [gymExerciseSchema],
    },
    {
        _id: false,
    }
);

module.exports = gymDaySchema;
