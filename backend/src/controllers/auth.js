const catchAsync = require('../utils/functions/catchAsync');
const authValidator = require('../validators/auth');
const authService = require('../services/auth');

const SuccessResponse = require('../utils/classes/SuccessResponse');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const UnauthorizedError = require('../errors/Unauthorized');
const ConflictError = require('../errors/Conflict');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const env = require('../config/env');

/**
 * Register a new user
 *
 * @route POST /auth/register
 * @access Public
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {JSON} 201 - Euccess message with access- and refresh tokens
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {ConflictError} 409 - User already exists.
 */
const register = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.register.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const { accessToken, refreshToken } = await authService.register(value);
    next(new SuccessResponse(201, `Successfully registered.`, { accessToken }, { refreshToken }));
});

/**
 * Log in an existing user
 *
 * @route POST /auth/login
 * @access Public
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {JSON} 200 - Success message with access- and refresh tokens
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 */
const login = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.login.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const { accessToken, refreshToken } = await authService.login(value.credential, value.password);
    next(new SuccessResponse(200, `Successfully logged in.`, { accessToken }, { refreshToken }));
});

/**
 * Send email or SMS with password reset link (that also contains the code)
 *
 * @route POST /auth/password/forgot
 * @access Public
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {JSON} 200 - Email successfully sent.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 */
const forgotPassword = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.forgotPassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.forgotPassword(value.credential);

    next(new SuccessResponse(200, `Password reset link successfully sent to ${value.credential}.`));
});

/**
 * Validate password reset code
 *
 * @route POST /auth/password/reset-code/validate
 * @access Public
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {JSON} 200 - Code successfully validated.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - Code not found.
 * @throws {BadRequestError} 400 - Password reset code expired.
 * @throws {BadRequestError} 400 - Password reset code already validated.
 */
const validatePasswordResetCode = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.validatePasswordResetCode.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.validatePasswordResetCode(value.code);
    next(new SuccessResponse(200, 'Code successfully validated.'));
});

/**
 * Resets password based on validated code.
 *
 * @route PUT /auth/password/reset
 * @access Public
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {JSON} 200 - Password successfully reset.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 * @throws {BadRequestError} 400 - Password reset code expired.
 * @throws {BadRequestError} 400 - Password reset code already validated.
 */
const resetPassword = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.resetPassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.resetPassword(value.code, value.password);
    next(new SuccessResponse(200, 'Password successfully reset.'));
});

/**
 * Changes password of the current authenticated user.
 *
 * @route PUT /auth/password/change
 * @access Private
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {JSON} 200 - Password successfully changed.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {UnauthorizedError} 401 - Incorrect password.
 */
const changePassword = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.changePassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.changePassword(req.user, value);
    next(new SuccessResponse(200, 'Password successfully changed.'));
});

/**
 * Generates new access- and refresh tokens
 *
 * @route POST /auth/token/refresh
 * @access Public
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {JSON} 200 - Token successfully refreshed.
 * @throws {UnprocessableEntityError} 422 - Requests body validation failed
 * @throws {NotFoundError} 404 - User not found.
 */
const refreshToken = catchAsync(async (req, res, next) => {
    const { accessToken, refreshToken } = await authService.refreshToken(req.cookies.refreshToken);
    next(
        new SuccessResponse(200, 'Token successfully refreshed.', { accessToken }, { refreshToken })
    );
});

/**
 * Logs out user by removing refresh token.
 *
 * @route POST /auth/logout
 * @access Public
 * @param {Request} req - Express request object
 * @param {Request} req - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} 200 - Successfully logged out.
 */
const logout = catchAsync(async (req, res, next) => {
    const refreshToken = 'delete';
    next(new SuccessResponse(200, 'Successfully logged out.', undefined, { refreshToken }));
});

module.exports = {
    register,
    login,
    forgotPassword,
    validatePasswordResetCode,
    changePassword,
    resetPassword,
    refreshToken,
    logout,
};
