const morgan = require('morgan');
const requestLogger = require('../utils/loggers/requestLogger');
const { performance } = require('perf_hooks');

morgan.token('body', (req) => {
    try {
        return Object.keys(req.body).length ? JSON.stringify(req.body) : '{}';
    } catch {
        return '{}';
    }
});

morgan.token('ip', (req) => {
    return (
        req.headers['x-forwarded-for'] ||
        req.socket?.remoteAddress ||
        'Unknown'
    )
        .split(',')[0]
        .trim();
});

morgan.token('user-agent', (req) => req.get('User-Agent') || 'Unknown');

const requestLoggerMiddleware = (req, res, next) => {
    const start = performance.now();

    morgan(
        ':method :url :status :res[content-length] - :response-time ms - IP: :ip - User-Agent: :user-agent - Body: :body',
        {
            stream: {
                write: (message) => requestLogger.http(message.trim()),
            },
        }
    )(req, res, () => {});

    res.on('finish', () => {
        const duration = (performance.now() - start).toFixed(2);
        requestLogger.http(
            `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
        );
    });

    next();
};

module.exports = requestLoggerMiddleware;
