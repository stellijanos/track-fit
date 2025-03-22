const catchAsync = require('../utils/functions/catchAsync');
const authValidator = require('../validators/auth');
const authService = require('../services/auth');

const SuccessResponse = require('../utils/classes/SuccessResponse');
const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const UnauthorizedError = require('../errors/Unauthorized');
const ConflictError = require('../errors/Conflict');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');


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
const register = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.register.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const tokens = await authService.register(value);
    next(new SuccessResponse(201, `Successfully registered.`, tokens));
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
const login = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.login.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const tokens = await authService.login(value.credential, value.password);
    next(new SuccessResponse(200, `Successfully logged in.`, tokens));
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
const forgotPassword = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.forgotPassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.forgotPassword(value.credential);

    next(new SuccessResponse(200, `Password reset link successfully sent to ${value.credential}.`));
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
const validatePasswordResetCode = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.validatePasswordResetCode.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.validatePasswordResetCode(value.code);
    next(new SuccessResponse(200, 'Code successfully validated.'));
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
const resetPassword = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.resetPassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.resetPassword(value.code, value.password);
    next(new SuccessResponse(200, 'Password successfully reset.'));
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
const changePassword = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.changePassword.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    await authService.changePassword(req.user, value);
    next(new SuccessResponse(200, 'Password successfully changed.'));
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
const refreshToken = catchAsync(async (req, res, next) => {
    const { error, value } = authValidator.refreshToken.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const tokens = await authService.refreshToken(value.refreshToken);
    next(new SuccessResponse(200, 'Token successfully refreshed.', tokens));
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
