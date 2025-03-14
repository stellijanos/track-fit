require('dotenv').config();

module.exports = {
    app: {
        uri: process.env.APP_URI,
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV,
        name: process.env.APP_NAME,
    },
    db: {
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
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
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
};
