const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const UnauthorizedError = require('../../errors/Unauthorized');

const SECRET_KEY = env.auth.jwt.secret;

/**
 * Generates a JSON Web Token (JWT)
 * @param {Object} payload - data to encode
 * @param {string} expiresIn - expiration time
 * @returns {string} - signed JWT
 */

const generateToken = (payload, expiresIn) => jwt.sign(payload, SECRET_KEY, { expiresIn });

/**
 * Verify JWT
 * @param {string} token - JWT to verify
 * @returns {Object} - decoded payload
 * @throws {Error} - throws error if the token is invalid or expired
 */
const verify = (token, type) => {
    try {
        // 1. Retrieve payload from token by verifying it
        const payload = jwt.verify(token, SECRET_KEY);

        // 2. Throw error if token type is invalid
        if (payload.type !== type) throw new Error(`Invalid ${type} token provided.`);

        // 3. Return payload
        return payload;
    } catch (error) {
        // 1. Define different JWT errors
        const errorMessages = {
            TokenExpiredError: 'Token has expired.',
            JsonWebTokenError: 'Invalid token provided.',
            NotBeforeError: 'Token is not yet active.',
        };

        // 2. Throw error accordingly:
        // - JWT Error
        // - Error with known message
        // - Unknown error
        throw new UnauthorizedError(
            errorMessages[error?.name] ||
                error.message ||
                'An unknown error occurred while verifying the token.'
        );
    }
};

module.exports = {
    generateToken,
    verify,
};
