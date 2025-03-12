const mongoose = require('mongoose');
const resetPasswordStatuses = require('../enums/resetPasswordStatuses');

const passwordResetSchema = new mongoose.Schema(
    {
        code: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId },
        sentTo: { type: String, required: true },
        status: { type: String, enum: Object.values(resetPasswordStatuses), default: resetPasswordStatuses.PENDING },
        expiresAt: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PasswordReset', passwordResetSchema);
