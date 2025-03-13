const jwt = require('jsonwebtoken');
const env = require('../../config/env');
const JwtVerificationError = require('../../errors/JwtVerificationError');

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
        if (error instanceof jwt.TokenExpiredError) throw new JwtVerificationError('Token has expired.');
        if (error instanceof jwt.JsonWebTokenError) throw new JwtVerificationError('Invalid token provided.');
        if (error instanceof jwt.NotBeforeError) throw new JwtVerificationError('Token is not yet active.');
        throw new JwtVerificationError(error.message || 'An unknown error occurred while verifying the token.');
    }
};

module.exports = {
    generateToken,
    verify,
};
