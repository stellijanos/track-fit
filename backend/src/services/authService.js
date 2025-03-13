const env = require('./../config/env');
const resetPasswordStatuses = require('../enums/resetPasswordStatuses');
const bcryptUtil = require('../utils/auth/bcrypt');
const jwtUtil = require('../utils/auth/jwt');
const generateRandomString = require('../utils/functions/generateRandomString');
const isDateExpired = require('../utils/functions/isDateExpired');
const ErrorResponse = require('../utils/classes/ErrorResponse');
const userRepository = require('../repositories/userRepository');
const passwordResetRepository = require('../repositories/passwordResetRepository');
const emailService = require('./emailService');

const ACCESS_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.accessToken;
const REFRESH_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.refreshToken;

const RESET_PASSWORD_CODE_EXPIRES_IN_M = env.auth.resetPasswordCodeExpiresInM;
const APP_URI = env.app.uri;

/**
 * Helper functions
 */

const isCodeExpired = (passwordReset) =>
    isDateExpired(passwordReset.expiresAt) || passwordReset.status === resetPasswordStatuses.EXPIRED;

const checkIsPending = async (passwordReset) => {
    if (isCodeExpired(passwordReset)) {
        await passwordResetRepository.update(passwordReset._id, {
            status: resetPasswordStatuses.EXPIRED,
        });
        throw new ErrorResponse(422, 'Code expired.');
    }

    if (passwordReset.status === resetPasswordStatuses.VALIDATED) {
        throw new ErrorResponse(422, 'Code already validated.');
    }
};

const checkIsValidated = async (passwordReset) => {
    if (isCodeExpired(passwordReset)) {
        await passwordResetRepository.update(passwordReset._id, {
            status: resetPasswordStatuses.EXPIRED,
        });
        throw new ErrorResponse(422, 'Code expired.');
    }

    if (passwordReset.status === resetPasswordStatuses.PENDING) {
        throw new ErrorResponse(422, 'Code not validated.');
    }
};

const setUserPassword = async (userId, password) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new ErrorResponse(404, 'User not found.');

    const hasedPassword = await bcryptUtil.hashPassword(password);
    await userRepository.updateOne(user._id, { password: hasedPassword });
};

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
    const { firstName, lastName, email, phone, birthDate, password, gender } = data;

    const existingUser = await userRepository.findByEmailOrPhone(email, phone);
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
const login = async (email, phone, password) => {
    const existingUser = await userRepository.findByEmailOrPhone(email, phone);
    if (!existingUser) {
        throw new ErrorResponse(401, 'Invalid email or phone.');
    }

    const correctPassword = await bcryptUtil.comparePasswords(password, existingUser.password);
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

/**
 * @async
 * @desc Sends email with password reset code
 * @param {String} email - credential (email/phone)
 * @returns {void} - Returns nothing.
 * @throws {ErrorResponse} 404 - Unprocessable entity / Validation error
 * @throws {ErrorResponse} 500 - Internal Server Error
 */
const forgotPassword = async (email) => {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) throw new ErrorResponse(404, 'User not found.');

    const data = {
        code: generateRandomString(16),
        user: existingUser._id,
        sentTo: email,
        expiresAt: Date.now() + RESET_PASSWORD_CODE_EXPIRES_IN_M * 60 * 1000,
    };

    const emailContent = {
        userName: existingUser.firstName,
        sendTo: email,
        resetLink: `${APP_URI}/reset-password?code=${data.code}`,
        validFor: `${RESET_PASSWORD_CODE_EXPIRES_IN_M} minutes`,
    };

    await passwordResetRepository.create(data);
    await emailService.sendResetPassword(emailContent);
};

/**
 * @route POST /auth/password/reset-code/validate
 * @desc Validate password reset code
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Code successfully validated.
 * @throws {ErrorResponse} 422 - Unprocessable entity | Validation error
 * @throws {ErrorResponse} 404 - Code not found. | Code expired. | Code already validated.
 * @throws {ErrorResponse} 500 - Internel Server Error.
 */
const validatePasswordResetCode = async (code) => {
    const passwordReset = await passwordResetRepository.findByCode(code);
    if (!passwordReset) throw new ErrorResponse(404, 'Code not found.');

    await checkIsPending(passwordReset);

    await passwordResetRepository.update(passwordReset._id, {
        status: resetPasswordStatuses.VALIDATED,
    });
};

/**
 * @async
 * @param {string} code - Password reset code
 * @param {string} password - Password to be set
 * @returns {void} - Returns nothing
 * @throws {ErrorResponse} 404 - User not found.
 * @throws {ErrorResponse} 401 - Invalid token provided.
 * @throws {ErrorResponse} 500 - Internel Server Error.
 */
const resetPassword = async (code, password) => {
    const passwordReset = await passwordResetRepository.findByCode(code);
    if (!passwordReset) throw new ErrorResponse(404, 'Code not found.');

    await checkIsValidated(passwordReset);
    await setUserPassword(passwordReset.user, password);

    await passwordResetRepository.update(passwordReset._id, {
        status: resetPasswordStatuses.EXPIRED,
    });
};

/**
 * @async
 * @param {User} user - User to change the password for
 * @param {Object} data - Current and new passwords
 * @returns {void} - Returns nothing
 * @throws {ErrorResponse} 401 - Incorrect password.
 * @throws {ErrorResponse} 500 - Internel Server Error.
 */
const changePassword = async (user, { currentPassword, newPassword }) => {
    const isCorrectPassword = await bcryptUtil.comparePasswords(currentPassword, user.password);
    if (!isCorrectPassword) throw new ErrorResponse(401, 'Incorrect password.');

    const hashedPassword = await bcryptUtil.hashPassword(newPassword);
    await userRepository.updateOne(user._id, { password: hashedPassword });
};

/**
 * @async
 * @param {string} refreshToken - JWT based on which the refresh happens
 * @returns {Object} - object with access- and refresh tokens
 * @throws {ErrorResponse} 404 - User not found.
 * @throws {ErrorResponse} 500 - Invalid JWT
 */
const refreshToken = async (refreshToken) => {
    const payload = jwtUtil.verifyToken(refreshToken);

    const existingUser = await userRepository.findById(payload._id);
    if (!existingUser) {
        throw new ErrorResponse(404, 'User not found.');
    }

    const jwtPayload = {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    };

    return await getTokens(jwtPayload);
};

module.exports = {
    register,
    login,
    forgotPassword,
    validatePasswordResetCode,
    changePassword,
    resetPassword,
    refreshToken,
};
