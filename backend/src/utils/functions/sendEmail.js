const nodemailer = require('nodemailer');
const env = require('../../config/env');

const host = env.smtp.host;
const port = env.smtp.port;
const user = env.smtp.user;
const pass = env.smtp.pass;

const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });

    const mailOptions = {
        from: user,
        to,
        subject,
        text,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
