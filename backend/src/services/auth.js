const env = require('../config/env');

const bcryptUtil = require('../utils/auth/bcrypt');
const jwtUtil = require('../utils/auth/jwt');

const jwtTypes = require('../enums/jwtTypes');
const credentialTypes = require('../enums/credentialTypes');
const resetPasswordStatuses = require('../enums/resetPasswordStatuses');

const detectCrenentialType = require('../utils/functions/detectCredentialType');
const generateRandomString = require('../utils/functions/generateRandomString');
const isDateExpired = require('../utils/functions/isDateExpired');

const userRepository = require('../repositories/user');
const passwordResetRepository = require('../repositories/passwordReset');

const emailService = require('./email');
const smsService = require('./sms');

const NotFoundError = require('../errors/NotFound');
const UnauthorizedError = require('../errors/Unauthorized');
const BadRequestError = require('../errors/BadRequest');
const ConflictError = require('../errors/Conflict');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');

const ACCESS_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.accessToken;
const REFRESH_TOKEN_EXPIRES_IN = env.auth.jwt.expiresIn.refreshToken;

const RESET_PASSWORD_CODE_EXPIRES_IN_M = env.auth.resetPasswordCode.expiresInM;
const RESET_PASSWORD_CODE_LENGTH = env.auth.resetPasswordCode.length;
const APP_URI = env.app.uri;

/**
 * Helper functions
 */

/**
 * Check if the password is correct or not.
 *
 * @async
 * @param {String} password - The password to check.
 * @param {String} hashedPassword - The hashed value to compare with.
 * @returns {void} - Returns nothing.
 * @throws {UnauthorizedError} - Incorrect password.
 */
const checkPasswords = async (password, hashedPassword) => {
    // 1. Compare plain password with the hased one
    const correctPassword = await bcryptUtil.comparePasswords(password, hashedPassword);

    // 2. Throw error if the passwords is incorrect
    if (!correctPassword) throw new UnauthorizedError('Incorrect password.');
};

/**
 * Check if the password reset code is expired.
 *
 * @async
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {Boolean} - Returns true if the reset code or the status itself is expired.
 */
const checkIsCodeExpired = async (passwordReset) => {
    // 1. Check if date is expired or the status is expired
    if (
        isDateExpired(passwordReset.expiresAt) ||
        passwordReset.status === resetPasswordStatuses.EXPIRED
    ) {
        // 1.1 Update status to expired (safety if it was not set before)
        await passwordResetRepository.update(passwordReset._id, {
            status: resetPasswordStatuses.EXPIRED,
        });

        // 1.2 Throw error if the password reset code is expired
        throw new BadRequestError('Password reset code expired.');
    }
};

/**
 * Check if the password reset code is pending.
 *
 * @async
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {void} - Returns nothing.
 * @throws{BadRequestError} - Password reset code expired.
 * @throws{BadRequestError} - Password reset code already validated.
 */
const checkIsPending = async (passwordReset) => {
    // 1. Check if the password reset code is expired
    await checkIsCodeExpired(passwordReset);

    // 2. Throw error if the code is already validated
    if (passwordReset.status === resetPasswordStatuses.VALIDATED)
        throw new BadRequestError('Password reset code already validated.');
};

/**
 * Check if the password reset code is validated.
 *
 * @async
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {void} - Returns nothing.
 * @throws{BadRequestError} - Password reset code expired.
 * @throws{BadRequestError} - Password reset code already validated.
 */
const checkIsValidated = async (passwordReset) => {
    // 1. Check if the password reset code is expired
    await checkIsCodeExpired(passwordReset);

    // 2. Throw error if the code is not yet validated
    if (passwordReset.status === resetPasswordStatuses.PENDING)
        throw new BadRequestError('Password reset code not validated.');
};

/**
 * Set the password of the user based on its ID.
 *
 * @async
 * @param {PasswordReset} passwordReset - The password reset object.
 * @returns {void} - Returns nothing.
 * @throws{NotFoundError} - User not found.
 */
const setUserPassword = async (userId, password) => {
    // 1. Generate password hash
    const hasedPassword = await bcryptUtil.hashPassword(password);

    // 2. Update users password
    const updated = await userRepository.findByIdAndUpdate(userId, { password: hasedPassword });

    // 3. Throw error if user not found
    if (!updated) throw new NotFoundError('User');
};

/**
 * Generate access- and refresh token.
 *
 * @param {Object} payload - Data which is in the token encrypted.
 * @returns {Object} -  Object with access- and refresh tokens.
 */
const getTokens = (payload) => ({
    accessToken: jwtUtil.generateToken(
        { ...payload, type: jwtTypes.ACCESS },
        ACCESS_TOKEN_EXPIRES_IN
    ),
    refreshToken: jwtUtil.generateToken(
        { ...payload, type: jwtTypes.REFRESH },
        REFRESH_TOKEN_EXPIRES_IN
    ),
});

/**
 * Service functions
 */

/**
 * Register / sign up a new user,
 *
 * @async
 * @param {Object} data - Contains user personal information and password.
 * @returns {Object} - Object with access- and refresh tokens.
 * @throws {ConflictError} - User already exists.
 */
const register = async (data) => {
    // 1. Retrieve provided data by the user
    const { firstName, lastName, email, phone, birthDate, password, gender } = data;

    // 2. Search for user based on provided email or phone
    const existingUser = await userRepository.findByEmailOrPhone(email, phone);

    // 3. Throw error if user already exists
    if (existingUser) throw new ConflictError('User already exists.');

    // 4. Generate password hash
    const hashedPassword = await bcryptUtil.hashPassword(password);

    // 5. Initialize user data
    const newUser = {
        firstName,
        lastName,
        email,
        phone,
        birthDate,
        gender,
        password: hashedPassword,
    };

    // 6. Save user to database
    const savedUser = await userRepository.createOne(newUser);

    // 7. Initialize JWT payload
    const jwtPayload = {
        sub: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
    };

    // 8. Generate and return (JWT) access- and refresh token with the payload
    return getTokens(jwtPayload);
};

/**
 * Log in / sign in an existing user.
 *
 * @async
 * @param {String} email - Email the user provided.
 * @param {String} phone - Phone number the user provided.
 * @param {String} password - Password the user provided.
 * @returns {Object} - Object with access- and refresh tokens.
 * @throws {UnauthorizedError} - Invalid email or phone.
 * @throws {UnauthorizedError} - Incorrect password.
 */
const login = async (credential, password) => {
    // 1. Check if user exists based on email or phone
    const existingUser = await userRepository.findByEmailOrPhone(credential, credential);

    // 2. Throw error if user was not found
    if (!existingUser) throw new UnauthorizedError('Invalid email or phone.');

    // 3. Check if the password is correct
    await checkPasswords(password, existingUser.password);

    // 4. Initialize JWT payload
    const jwtPayload = {
        sub: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    };

    // 5. Generate and return (JWT) access- and refresh token with the payload
    return getTokens(jwtPayload);
};

/**
 * Send email with password reset code.
 *
 * @async
 * @param {String} email - Credential (email/phone).
 * @returns {void} - Returns nothing.
 * @throws {NotFoundError} - User not found.
 */
const forgotPassword = async (credential) => {
    // 1. Check if user exists based on email or phone
    const existingUser = await userRepository.findByEmailOrPhone(credential, credential);

    // 2. Throw error if user not found
    if (!existingUser) throw new NotFoundError('User');

    // 3. Detect if the credential is email or phone
    const credentialType = detectCrenentialType(credential);

    // 4. Throw error if the credential type is invalid
    if (credentialType === credentialTypes.INVALID)
        throw new UnprocessableEntityError('Invalid email or phone provided');

    // 5. Initialize password reset data
    const newReset = {
        code: generateRandomString(RESET_PASSWORD_CODE_LENGTH),
        user: existingUser._id,
        sentTo: credential,
        expiresAt: Date.now() + RESET_PASSWORD_CODE_EXPIRES_IN_M * 60 * 1000,
    };

    // 6. Create new password reset
    await passwordResetRepository.create(newReset);

    // 7. Initialize rquired data for email or SMS service
    const data = {
        userName: existingUser.firstName,
        sendTo: credential,
        resetLink: `${APP_URI}/reset-password?code=${newReset.code}`,
        validFor: `${RESET_PASSWORD_CODE_EXPIRES_IN_M} minutes`,
    };

    // 8. Send out message (email or SMS) based on credential
    if (credentialType === credentialTypes.EMAIL) {
        await emailService.sendResetPassword(data);
    } else if (credentialType === credentialTypes.PHONE) {
        await smsService.sendResetPassword(data);
    }
};

/**
 * Validate password reset code.
 *
 * @async
 * @param {String} code - Password reset code to be valideted.
 * @returns {void} - Returns nothing.
 * @throws {NotFoundError}- Code not found.
 * @throws {BadRequestError} - Password reset code expired.
 * @throws {BadRequestError} - Password reset code already validated.
 */
const validatePasswordResetCode = async (code) => {
    // 1. Retrieve password reset from database based on the code
    const passwordReset = await passwordResetRepository.findByCode(code);

    // 2. Throw error if it does not exist
    if (!passwordReset) throw new NotFoundError('Code');

    // 3. Check if the code is pending
    await checkIsPending(passwordReset);

    // 4. Update the reset code status to valid (passed validation)
    await passwordResetRepository.update(passwordReset._id, {
        status: resetPasswordStatuses.VALIDATED,
    });
};

/**
 * Reset users password based on validated and not expired code.
 *
 * @async
 * @param {String} code - Password reset code.
 * @param {String} password - Password to be set.
 * @returns {void} - Returns nothing.
 * @throws {NotFoundError} - User not found.
 * @throws {BadRequestError} - Password reset code expired.
 * @throws {BadRequestError} - Password reset code already validated.
 */
const resetPassword = async (code, password) => {
    // 1. Retrieve password reset from database based on the code
    const passwordReset = await passwordResetRepository.findByCode(code);

    // 2. Throw error if it does not exist
    if (!passwordReset) throw new NotFoundError('Code');

    // 3. Check if the code is validated
    await checkIsValidated(passwordReset);

    // 4. Set the password for the user
    await setUserPassword(passwordReset.user, password);

    // 5. Set the status of the code to expired
    await passwordResetRepository.update(passwordReset._id, {
        status: resetPasswordStatuses.EXPIRED,
    });
};

/**
 * Change user password.
 *
 * @async
 * @param {User} user - User to change the password for.
 * @param {Object} data - Current and new passwords.
 * @returns {void} - Returns nothing.
 * @throws {UnauthorizedError} - Incorrect password.
 */
const changePassword = async (user, { currentPassword, newPassword }) => {
    // 1. Check if the password is correct or not.
    await checkPasswords(currentPassword, user.password);

    // 2. Generate new password hash
    const hashedPassword = await bcryptUtil.hashPassword(newPassword);

    // 3. Change the users password to the new hashed one
    await userRepository.findByIdAndUpdate(user._id, { password: hashedPassword });
};

/**
 * @async
 * @desc Generate new access- and refresh tokens
 * @param {String} refreshToken - JWT based on which the refresh happens
 * @returns {Object} - Object with access- and refresh tokens
 * @throws {NotFoundError} User not found.
 */
const refreshToken = async (refreshToken) => {
    // 1. Retrieve payload by verifying jwt
    const payload = jwtUtil.verify(refreshToken, jwtTypes.REFRESH);

    // 2. Retrieve user based on payload sub (which is user id)
    const existingUser = await userRepository.findById(payload.sub);

    // 3. Throw error if user not found
    if (!existingUser) throw new NotFoundError('User');

    // 4. Initialize payload
    const jwtPayload = {
        sub: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
    };

    // 5. Generate new access- and refresh tokens and return them
    return getTokens(jwtPayload);
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
