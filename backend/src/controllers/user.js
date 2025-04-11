const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/user');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const userDto = require('../dtos/user');
const userValidator = require('../validators/user');

/**
 * Retrieve the profile details for the current authenticated user.
 *
 * @route GET /users/me
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and retrieved user (200)
 * @throws {NotFoundError} - User not found (404)
 */
const getMe = (req, res, next) => {
    next(new SuccessResponse(200, 'User successfully retrieved.', { user: userDto(req.user) }));
};

/**
 * Update the profile details for the current authenticated user.
 *
 * @route PATCH /users/me
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and updated user (200)
 * @throws {NotFoundError} - User not found (404)
 */
const updateMe = catchAsync(async (req, res, next) => {
    const { error, value } = userValidator.updateMe.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const user = await userService.updateById(req.userId, value);
    next(new SuccessResponse(200, 'User successfully updated.', { user: userDto(user) }));
});

/**
 * Delete the current authenticated user.
 *
 * @route DELETE /users/me
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with no content (204)
 * @throws {NotFoundError} - User not found (404)
 */
const deleteMe = catchAsync(async (req, res, next) => {
    await userService.deleteMe(req.userId);
    next(new SuccessResponse(204));
});

/**
 * Change the current authenticated users profile picture.
 *
 * @route POST /users/me/profile-picture
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and user with the changed profile picture (200)
 * @throws {NotFoundError} - User not found (404)
 */
const changeMyProfilePicture = catchAsync(async (req, res, next) => {
    if (!req.file) throw new UnprocessableEntityError('No image file provided');

    const user = await userService.changeProfilePicture(
        req.userId,
        req.user.profilePicture,
        req.file.filename
    );
    next(
        new SuccessResponse(200, 'Profile picture successfully changed.', { user: userDto(user) })
    );
});

/**
 * Deletes the current authenticated users profile picture.
 *
 * @route DELETE /users/me/profile-picture
 * @access Private
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {void} - Responds with success message and user with removed profile picture (200)
 * @throws {NotFoundError} - User not found (404)
 */
const deleteMyProfilePicture = catchAsync(async (req, res, next) => {
    const user = await userService.deleteProfilePicture(req.userId, req.user.profilePicture);
    next(
        new SuccessResponse(200, 'Profile picture successfully removed.', { user: userDto(user) })
    );
});

module.exports = {
    getMe,
    updateMe,
    deleteMe,
    changeMyProfilePicture,
    deleteMyProfilePicture,
};
