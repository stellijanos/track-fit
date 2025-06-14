require('dotenv').config();

module.exports = {
    app: {
        uri: process.env.APP_URI,
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV,
        name: process.env.APP_NAME,
    },
    frontend: {
        uri: process.env.FRONTEND_URI,
    },
    auth: {
        bcrypt: {
            saltRounds: process.env.BCRYPT_SALTROUNDS || 10,
        },
        jwt: {
            secret: process.env.JWT_SECRET,
            expiresIn: {
                accessToken: '15m',
                refreshToken: '30d',
                resetPasswordToken: '10m',
            },
        },
        resetPasswordCode: {
            expiresInM: 15,
            length: 16,
        },
    },
    cookies: {
        refreshToken: {
            name: 'refreshToken',
            maxAge: 1000 * 60 * 60 * 24 * 30,
        },
    },
    db: {
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    sms: {
        key: process.env.SMS_KEY,
        url: process.env.SMS_URL,
        maxLength: 160,
    },
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },

    openAiApiKey: process.env.OPENAI_API_KEY,
};
