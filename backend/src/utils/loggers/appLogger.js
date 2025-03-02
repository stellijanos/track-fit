const winston = require('winston');
const path = require('path');
const getDailyLogFolder = require('../functions/getDailyFolder');

const appLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),

        new winston.transports.File({
            filename: path.join(getDailyLogFolder(), 'app.log'),
            level: 'info',
        }),

        new winston.transports.File({
            filename: path.join(getDailyLogFolder(), 'error.log'),
            level: 'error',
        }),
    ],
});

module.exports = appLogger;
