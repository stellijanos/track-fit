const sendEmail = require('../utils/functions/sendEmail');

const sendResetPassword = async (data) => {
    const subject = 'Reset password';
    const html = `Hello, ${data.userName}! reset your password here: ${data.resetLink}. Valid for ${data.validFor}.`;
    await sendEmail(data.sendTo, subject, html);
};

module.exports = {
    sendResetPassword,
};
