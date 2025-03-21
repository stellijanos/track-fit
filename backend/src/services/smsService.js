const sendSMS = require('../utils/functions/sendSMS');

const sendResetPassword = async (data) => {
    const phone = data.sendTo;
    const message = `Hello, ${data.userName}! reset your password here: ${data.resetLink}. Valid for ${data.validFor}.`;

    await sendSMS(phone, message);
};

module.exports = {
    sendResetPassword,
};
