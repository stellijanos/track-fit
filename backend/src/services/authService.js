const env = require('./../config/env');
const bcryptUtil = require('../utils/auth/bcrypt');
const jwtUtil = require('../utils/auth/jwt');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const userRepository = require('../repositories/userRepository');

const ACCESS_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.accessToken;
const REFRESH_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.refreshToken;
const RESET_PASSWORD_TOKEN_EXPIRES_IN =
    env.auth.jwt.expiresIn.resetPasswordToken;

/**
 * Helper functions
 */

/**
 *
 * @param {Object} payload - Data which is in the token encrypted
 * @returns {Object} - Access token and refresh token as a single object
 */
const getTokens = (payload) => {
    return {
        accessToken: jwtUtil.generateToken(payload, ACCESS_TOKEN_EXPIRES_IN),
        refreshToken: jwtUtil.generateToken(payload, REFRESH_TOKEN_EXPIRES_IN),
    };
};

/**
 * Service functions
 */

/**
 * @async
 * @param {Object} data - contains user personal information and password
 * @returns {Object} - Object with access- and refresh tokens
 * @throws {ErrorResponse} 422 - Unprocessable entity / Validation error
 * @throws {ErrorResponse} 409 - User already exists.
 */
const register = async (data) => {
    const { firstName, lastName, email, phone, birthDate, password, gender } =
        data;

    const existingUser = await userRepository.getByEmailOrPhone(email, phone);
    if (existingUser) {
        throw new ErrorResponse(409, 'User already exists.');
    }

    const hashedPassword = await bcryptUtil.hashPassword(password);

    const newUser = {
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        gender,
        password: hashedPassword,
    };

    const savedUser = await userRepository.createOne(newUser);

    const jwtPayload = {
        _id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
    };

    return getTokens(jwtPayload);
};

/**
 * @async
 * @param {Object} data - credential (email/phone) and password
 * @returns {Object} - Object with access- and refresh tokens
 * @throws {ErrorResponse} 404 - Unprocessable entity / Validation error
 * @throws {ErrorResponse} 401 - Invalid email or phone.
 * @throws {ErrorResponse} 401 - Incorrect password.
 */
const login = async ({ credential, password }) => {
    const existingUser = await userRepository.getByEmailOrPhone(
        credential,
        credential
    );
    if (!existingUser) {
        throw new ErrorResponse(401, 'Invalid email or phone.');
    }

    const correctPassword = await bcryptUtil.comparePasswords(
        password,
        existingUser.password
    );
    if (!correctPassword) {
        throw new ErrorResponse(401, 'Incorrect password.');
    }

    const jwtPayload = {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    };

    return getTokens(jwtPayload);
};

const changePassword = async (user, { currentPassword, newPassword }) => {
    const isCorrectPassword = await bcryptUtil.comparePasswords(
        currentPassword,
        user.password
    );

    if (!isCorrectPassword) {
        throw new ErrorResponse(401, 'Incorrect password.');
    }

    const hashedPassword = await bcryptUtil.hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    return;
};

module.exports = {
    register,
    login,
    changePassword,
};
