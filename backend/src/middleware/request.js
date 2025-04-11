const morgan = require('morgan');
const requestLogger = require('../utils/loggers/request');
const { performance } = require('perf_hooks');

// Define custom token to log request body
morgan.token('body', (req) => {
    try {
        return Object.keys(req.body).length ? JSON.stringify(req.body) : '{}';
    } catch {
        return '{}';
    }
});

// Define custom token to extract clients IP address
morgan.token('ip', (req) => {
    return (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown')
        .split(',')[0]
        .trim();
});

// Define custom token for user-agent header
morgan.token('user-agent', (req) => req.get('User-Agent') || 'Unknown');

/**
 * Middleware function for logging requests
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function (to proceed to next middleware)
 */
module.exports = requestLoggerMiddleware = (req, res, next) => {
    // 1. Start measuring time
    const start = performance.now();

    // 2. Use morgan for structured logging with custom tokens
    morgan(
        ':method :url :status :res[content-length] - :response-time ms - IP: :ip - User-Agent: :user-agent - Body: :body',
        {
            stream: {
                write: (message) => requestLogger.http(message.trim()),
            },
        }
    )(req, res, () => {});

    // 3. Also log total response time once response is finished
    res.on('finish', () => {
        const duration = (performance.now() - start).toFixed(2);
        requestLogger.http(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    // 4. Proceed to next middleware
    next();
};
