const nodemailer = require('nodemailer');
const env = require('../../config/env');

const name = env.app.name;
const host = env.smtp.host;
const port = env.smtp.port;
const user = env.smtp.user;
const pass = env.smtp.pass;

const sendMail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });

    const mailOptions = {
        from: `"${name}" <${user}>`,
        replyTo: user,
        to,
        subject,
        html,
    };

    return await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
