const axios = require('axios');
const env = require('../config/env');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');

const sendSMS = async (phone, message) => {
    const URL = env.sms.url;
    const KEY = env.sms.key;
    const MAX_LENGTH = env.sms.maxLength;

    if (!phone.startsWith('+40')) throw new UnprocessableEntityError('Phone number must begin with +40.');
    if (message.length > MAX_LENGTH) throw new UnprocessableEntityError('Message too long.');

    const data = {
        phone,
        shortTextMessage: message,
        sendAsShort: true,
    };

    const headers = {
        Authorization: `Bearer ${KEY}`,
        'Content-Type': 'application/json',
    };

    await axios.post(URL, data, { headers });
};

module.exports = {
    sendSMS,
};
