const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const UnauthorizedError = require('../../errors/UnauthorizedError');

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
        const payload = jwt.verify(token, SECRET_KEY);
        if (payload.type !== type) throw new Error(`Invalid ${type} token provided.`);

        return payload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) throw new UnauthorizedError('Token has expired.');
        if (error instanceof jwt.JsonWebTokenError) throw new UnauthorizedError('Invalid token provided.');
        if (error instanceof jwt.NotBeforeError) throw new UnauthorizedError('Token is not yet active.');
        throw new UnauthorizedError(error.message || 'An unknown error occurred while verifying the token.');
    }
};

module.exports = {
    generateToken,
    verify,
};
