const sendSMS = require('../utils/functions/sendSMS');

/**
 * Send password reset SMS to phone number
 *
 * @async
 * @param {Object} data - Data containing phone number and what to send in the SMS
 */
const sendResetPassword = async (data) => {
    const phone = data.sendTo;
    const message = `Hello, ${data.userName}! reset your password here: ${data.resetLink}. Valid for ${data.validFor}.`;

    await sendSMS(phone, message);
};

module.exports = {
    sendResetPassword,
};
