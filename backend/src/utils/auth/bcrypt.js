const bcrypt = require('bcrypt');
const env = require('../../config/env');

const SALT_ROUNDS = Number(env.auth.bcrypt.saltRounds);

/**
 * Hashes a password with bcrypt
 * @param {string} password - plain password to hash
 * @returns {Promise<string>} - hashed password
 */
const hashPassword = async (password) =>
    await bcrypt.hash(password, SALT_ROUNDS);

/**
 * Compares a password with a hashed password
 * @param {string} plain
 * @param {string} hashed
 * @returns
 */
const comparePasswords = async (plain, hashed) =>
    await bcrypt.compare(plain, hashed);

module.exports = {
    hashPassword,
    comparePasswords,
};
