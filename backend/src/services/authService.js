const env = require('./../config/env');
const bcryptUtil = require('../utils/auth/bcrypt');
const jwtUtil = require('../utils/auth/jwt');
const jwtTypes = require('../enums/jwtTypes');
const resetPasswordStatuses = require('../enums/resetPasswordStatuses');
const generateRandomString = require('../utils/functions/generateRandomString');
const isDateExpired = require('../utils/functions/isDateExpired');
const userRepository = require('../repositories/userRepository');
const passwordResetRepository = require('../repositories/passwordResetRepository');
const emailService = require('./emailService');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const ACCESS_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.accessToken;
const REFRESH_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.refreshToken;

const RESET_PASSWORD_CODE_EXPIRES_IN_M = env.auth.resetPasswordCode.expiresInM;
const RESET_PASSWORD_CODE_LENGTH = env.auth.resetPasswordCode.length;
const APP_URI = env.app.uri;

/**
 * Helper functions
 */

/**
 * @async
 * @desc Check if the password is correct or not.
 * @param {String} password - The password to check.
 * @param {String} hashedPassword - The hashed value to compare with.
 * @returns {void} - Returns nothing.
 * @throws {UnauthorizedError} - Incorrect password.
 */
const checkPasswords = async (password, hashedPassword) => {
    const correctPassword = await bcryptUtil.comparePasswords(password, hashedPassword);
    if (!correctPassword) throw new UnauthorizedError('Incorrect password.');
};

/**
 * @desc Check if the password reset code is expired.
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {Boolean} - Returns true if the reset code or the status itself is expired.
 */
const isCodeExpired = (passwordReset) =>
    isDateExpired(passwordReset.expiresAt) || passwordReset.status === resetPasswordStatuses.EXPIRED;

/**
 * @async
 * @desc Check if the password reset code is pending.
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {void} - Returns nothing.
 * @throws{BadRequestError} - Password reset code expired.
 * @throws{BadRequestError} - Password reset code already validated.
 */
const checkIsPending = async (passwordReset) => {
    if (isCodeExpired(passwordReset)) {
        await passwordResetRepository.update(passwordReset._id, {
            status: resetPasswordStatuses.EXPIRED,
        });
        throw new BadRequestError('Password reset code expired.');
    }

    if (passwordReset.status === resetPasswordStatuses.VALIDATED)
        throw new BadRequestError('Password reset code already validated.');
};

/**
 * @async
 * @desc Check if the password reset code is validated.
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {void} - Returns nothing.
 * @throws{BadRequestError} - Password reset code expired.
 * @throws{BadRequestError} - Password reset code already validated.
 */
const checkIsValidated = async (passwordReset) => {
    if (isCodeExpired(passwordReset)) {
        await passwordResetRepository.update(passwordReset._id, {
            status: resetPasswordStatuses.EXPIRED,
        });
        throw new BadRequestError('Password reset code expired.');
    }

    if (passwordReset.status === resetPasswordStatuses.PENDING)
        throw new BadRequestError('Password reset code not validated.');
};

/**
 * @async
 * @desc Set the password of the user based on its ID.
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {void} - Returns nothing.
 * @throws{NotFoundError} - User not found.
 */
const setUserPassword = async (userId, password) => {
    const user = await userRepository.findById(userId);
    if (!user) throw new NotFoundError('User');

    const hasedPassword = await bcryptUtil.hashPassword(password);
    await userRepository.updateById(user._id, { password: hasedPassword });
};

/**
 * @descr Generate access- and refresh tokens.
 * @param {Object} payload - Data which is in the token encrypted.
 * @returns {Object} -  Object with access- and refresh tokens.
 */
const getTokens = (payload) => {
    return {
        accessToken: jwtUtil.generateToken({ ...payload, type: jwtTypes.ACCESS }, ACCESS_TOKEN_EXPIRES_IN),
        refreshToken: jwtUtil.generateToken({ ...payload, type: jwtTypes.REFRESH }, REFRESH_TOKEN_EXPIRES_IN),
    };
};

/**
 * Service functions
 */

/**
 * @async
 * @desc Register / sign up a new user,
 * @param {Object} data - Contains user personal information and password.
 * @returns {Object} - Object with access- and refresh tokens.
 * @throws {ConflictError} - User already exists.
 */
const register = async (data) => {
    const { firstName, lastName, email, phone, birthDate, password, gender } = data;

    const existingUser = await userRepository.findByEmailOrPhone(email, phone);
    if (existingUser) throw new ConflictError('User already exists.');

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
 * @desc Log in / sign in an existing user.
 * @param {String} email - Email the user provided.
 * @param {String} phone - Phone number the user provided.
 * @param {String} password - Password the user provided.
 * @returns {Object} - Object with access- and refresh tokens.
 * @throws {UnauthorizedError} - Invalid email or phone.
 * @throws {UnauthorizedError} - Incorrect password.
 */
const login = async (email, phone, password) => {
    const existingUser = await userRepository.findByEmailOrPhone(email, phone);
    if (!existingUser) throw new UnauthorizedError('Invalid email or phone.');

    await checkPasswords(password, existingUser.password);

    const jwtPayload = {
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    };

    return getTokens(jwtPayload);
};

/**
 * @async
 * @desc Send email with password reset code.
 * @param {String} email - Credential (email/phone).
 * @returns {void} - Returns nothing.
 * @throws {NotFoundError} - User not found.
 */
const forgotPassword = async (email) => {
    const existingUser = await userRepository.findByEmail(email);
    if (!existingUser) throw new NotFoundError('User');

    const data = {
        code: generateRandomString(RESET_PASSWORD_CODE_LENGTH),
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
 * @async
 * @desc Validate password reset code.
 * @param {String} code - Password reset code to be valideted.
 * @returns {void} - Returns nothing.
 * @throws {NotFoundError}- Code not found.
 * @throws {BadRequestError} - Password reset code expired.
 * @throws {BadRequestError} - Password reset code already validated.
 */
const validatePasswordResetCode = async (code) => {
    const passwordReset = await passwordResetRepository.findByCode(code);
    if (!passwordReset) throw new NotFoundError('Code');

    await checkIsPending(passwordReset);

    await passwordResetRepository.update(passwordReset._id, {
        status: resetPasswordStatuses.VALIDATED,
    });
};

/**
 * @async
 * @desc Reset users password based on validated and not expired code.
 * @param {String} code - Password reset code.
 * @param {String} password - Password to be set.
 * @returns {void} - Returns nothing.
 * @throws {NotFoundError} - User not found.
 * @throws {BadRequestError} - Password reset code expired.
 * @throws {BadRequestError} - Password reset code already validated.
 */
const resetPassword = async (code, password) => {
    const passwordReset = await passwordResetRepository.findByCode(code);
    if (!passwordReset) throw new NotFoundError('Code');

    await checkIsValidated(passwordReset);
    await setUserPassword(passwordReset.user, password);

    await passwordResetRepository.update(passwordReset._id, {
        status: resetPasswordStatuses.EXPIRED,
    });
};

/**
 * @async
 * @desc Change user password.
 * @param {User} user - User to change the password for.
 * @param {Object} data - Current and new passwords.
 * @returns {void} - Returns nothing.
 * @throws {UnauthorizedError} - Incorrect password.
 */
const changePassword = async (user, { currentPassword, newPassword }) => {
    await checkPasswords(currentPassword, user.password);
    const hashedPassword = await bcryptUtil.hashPassword(newPassword);
    await userRepository.updateById(user._id, { password: hashedPassword });
};

/**
 * @async
 * @desc Generate new access- and refresh tokens
 * @param {String} refreshToken - JWT based on which the refresh happens
 * @returns {Object} - Object with access- and refresh tokens
 * @throws {NotFoundError} User not found.
 */
const refreshToken = async (refreshToken) => {
    const payload = jwtUtil.verify(refreshToken, jwtTypes.REFRESH);

    const existingUser = await userRepository.findById(payload._id);
    if (!existingUser) throw new NotFoundError('User');

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
