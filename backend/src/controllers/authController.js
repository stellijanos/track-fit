const catchAsync = require('../utils/functions/catchAsync');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const authDto = require('../dtos/authDto');
const authService = require('../services/authService');
const ErrorResponse = require('../utils/classes/ErrorResponse');

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 201 - Euccess message with access- and refresh tokens
 * @throws {ErrorResponse} 422 - Unprocessable entity / Validation error
 * @throws {ErrorResponse} 409 - User already exists.
 */
const register = catchAsync(async (req, res) => {
    const { error, value } = authDto.register.validate(req.body);
    if (error) {
        throw new ErrorResponse(422, error.message);
    }
    const tokens = await authService.register(value);
    res.status(201).json(new SuccessResponse(`Successfully registered.`, tokens));
});

/**
 * @route POST /auth/login
 * @desc Login an existing user
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 200 - Success message with access- and refresh tokens
 * @throws {ErrorResponse} 422 - Unprocessable entity / Validation error
 * @throws {ErrorResponse} 404 - User not found.
 */
const login = catchAsync(async (req, res) => {
    const tokens = await authService.login(req.body);
    res.status(200).json(new SuccessResponse(`Successfully logged in.`, tokens));
});

const forgotPassword = catchAsync(async (req, res) => {
    await authService.forgotPassword(req.body.email);
    res.status(200).json(new SuccessResponse('Email successfully sent.'));
});

const validatePasswordResetCode = catchAsync(async (req, res) => {
    const { code } = req.body;
    await authService.validatePasswordResetCode(code);
    res.status(200).json(new SuccessResponse('Code successfully validated.'));
});

const resetPassword = catchAsync(async (req, res) => {
    const { error, value } = authDto.resetPassword.validate(req.body);
    if (error) {
        throw new ErrorResponse(422, error.message);
    }

    const { code, password } = value;
    await authService.resetPassword(code, password);

    res.status(200).json(new SuccessResponse('Password successfully reset.'));
});

const changePassword = catchAsync(async (req, res) => {
    await authService.changePassword(req.user, req.body);
    res.status(200).json(new SuccessResponse('Password successfully changed.'));
});

const refreshToken = catchAsync(async (req, res) => {
    const tokens = await authService.refreshToken(req.body.refreshToken);
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
