const catchAsync = require('../utils/functions/catchAsync');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const authService = require('../services/authService');

/**
 * @route POST /auth/register
 * @desc Register a new user
 * @access Public
 * @param {Object} req - Express request object
 * @param {Object} req - Express response object
 * @returns {JSON} 201 - Euccess message with access- and refresh tokens
 * @throws {ErrorResponse} 422 - Unprocessable entity / vValidation error
 * @throws {ErrorResponse} 409 - User already exists.
 */
const register = catchAsync(async (req, res) => {
    const tokens = await authService.register(req.body);
    res.status(201).json(
        new SuccessResponse(`Successfully registered.`, tokens)
    );
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
    res.status(200).json(
        new SuccessResponse(`Successfully logged in.`, tokens)
    );
});

const changePassword = catchAsync(async (req, res) => {
    await authService.changePassword(req.user, req.body);

    res.status(200).json(new SuccessResponse('Password successfully changed.'));
});

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.body);
});

module.exports = {
    register,
    login,
    changePassword,
    resetPassword,
};
