const mongoose = require('mongoose');
const userRoles = require('../enums/userRoles');
const genders = require('../enums/genders');
const dbDefaults = require('../config/dbDefaults');

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        birthDate: { type: Date, required: true },
        password: { type: String, required: true },
        passwordResetToken: { type: String, default: null },
        role: {
            type: String,
            enum: Object.values(userRoles),
            default: userRoles.CLIENT,
        },
        profilePicture: {
            type: String,
            default: dbDefaults.PROFILE_PICTURE,
        },
        gender: {
            type: String,
            enum: Object.values(genders),
            default: genders.OTHER,
        },
        height: { type: Number, default: null },
        lastMeasurement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Measurement',
            default: null,
        },
        currentWaterTarget: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WaterTarget',
            default: null,
        },
        currentCaloricTarget: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CaloricTarget',
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
