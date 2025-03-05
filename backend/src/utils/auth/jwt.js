const jwt = require('jsonwebtoken');
const env = require('../../config/env');

const SECRET_KEY = env.auth.jwt.secret;

/**
 * Generates a JSON Web Token (JWT)
 * @param {Object} payload - data to encode
 * @param {string} expiresIn - expiration time
 * @returns {string} - signed JWT
 */

const generateToken = (payload, expiresIn) =>
    jwt.sign(payload, SECRET_KEY, { expiresIn });

/**
 * Verify JWT
 * @param {string} token - JWT to verify
 * @returns {Object} - decoded payload
 * @throws {Error} - throws error if the token is invalid or expired
 */
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = {
    generateToken,
    verifyToken,
};
