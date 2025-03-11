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
        gender: {
            type: String,
            enum: Object.values(genders),
            default: genders.OTHER,
        },
        height: { type: Number, default: null },

        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(userRoles),
            default: userRoles.CLIENT,
        },
        isEmailVerified: { type: Boolean, default: false },
        isPhoneVerified: { type: Boolean, default: false },

        profilePicture: {
            type: String,
            default: dbDefaults.PROFILE_PICTURE,
        },

        lastMeasurement: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Measurement',
            default: null,
        },
        currentWaterTarget: {
            value: { type: Number, min: 0, default: dbDefaults.WATER_TARGET },
            unit: { type: String, default: dbDefaults.WATER_UNIT },
            entryOptions: {
                type: [{ type: Number, min: 10 }],
                default: dbDefaults.WATER_ENTRIES,
            },
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
