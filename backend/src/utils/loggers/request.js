const winston = require('winston');
const path = require('path');
const getDailyLogFolder = require('../functions/getDailyFolder');

module.exports = winston.createLogger({
    level: 'http',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: path.join(getDailyLogFolder(), 'requests.log'),
            level: 'http',
        }),
    ],
});
