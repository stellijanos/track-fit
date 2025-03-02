require('dotenv').config();

module.exports = {
    app: {
        uri: process.env.APP_URI,
        host: process.env.HOST,
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV,
    },
    db: {
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
};
