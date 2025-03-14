const catchAsync = require('../utils/functions/catchAsync');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');
const authDto = require('../dtos/authDto');
const authService = require('../services/authService');

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 201 - Euccess message with access- and refresh tokens
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {ConflictError} 409 - User already exists.
 */
const register = catchAsync(async (req, res) => {
    const { error, value } = authDto.register.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const tokens = await authService.register(value);
    res.status(201).json(new SuccessResponse(`Successfully registered.`, tokens));
});

/**
 * @route POST /auth/login
 * @desc Log in an existing user
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Success message with access- and refresh tokens
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 */
const login = catchAsync(async (req, res) => {
    const { error, value } = authDto.login.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const { email, phone, password } = value;
    const tokens = await authService.login(email, phone, password);
    res.status(200).json(new SuccessResponse(`Successfully logged in.`, tokens));
});

/**
 * @route POST /auth/password/forgot
 * @desc Send email to reset password
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Email successfully sent.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 */
const forgotPassword = catchAsync(async (req, res) => {
    const { error, value } = authDto.forgotPassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const { email } = value;
    await authService.forgotPassword(email);

    res.status(200).json(new SuccessResponse('Email successfully sent.'));
});

/**
 * @route POST /auth/password/reset-code/validate
 * @desc Validate password reset code
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Code successfully validated.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - Code not found.
 * @throws {BadRequestError} 400 - Password reset code expired.
 * @throws {BadRequestError} 400 - Password reset code already validated.
 */
const validatePasswordResetCode = catchAsync(async (req, res) => {
    const { error, value } = authDto.validatePasswordResetCode.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const { code } = value;
    await authService.validatePasswordResetCode(code);
    res.status(200).json(new SuccessResponse('Code successfully validated.'));
});

/**
 * @route PUT /auth/password/reset
 * @desc Resets password based on validated code.
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Password successfully reset.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 * @throws {BadRequestError} 400 - Password reset code expired.
 * @throws {BadRequestError} 400 - Password reset code already validated.
 */
const resetPassword = catchAsync(async (req, res) => {
    const { error, value } = authDto.resetPassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const { code, password } = value;
    await authService.resetPassword(code, password);

    res.status(200).json(new SuccessResponse('Password successfully reset.'));
});

/**
 * @route PUT /auth/password/change
 * @desc Changes password of the current authenticated user.
 * @access Private
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Password successfully changed.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {UnauthorizedError} 401 - Incorrect password.
 */
const changePassword = catchAsync(async (req, res) => {
    const { error, value } = authDto.changePassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.changePassword(req.user, value);
    res.status(200).json(new SuccessResponse('Password successfully changed.'));
});

/**
 * @route POST /auth/token/refresh
 * @desc Generates new access- and refresh tokens
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Token successfully refreshed.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 */
const refreshToken = catchAsync(async (req, res) => {
    const { error, value } = authDto.refreshToken.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const { refreshToken } = value;
    const tokens = await authService.refreshToken(refreshToken);

    res.status(200).json(new SuccessResponse('Token successfully refreshed.', tokens));
});

module.exports = {
    register,
    login,
    forgotPassword,
    validatePasswordResetCode,
    changePassword,
    resetPassword,
    refreshToken,
};
