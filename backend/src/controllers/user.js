const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/user');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const userDto = require('../dtos/user');
const userValidator = require('../validators/user');

/**
 * @route GET /users/me
 * @desc Fetch the profile details of the current authenticated user.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {SuccessResponse} 200 - Response containing the user data.
 * @throws  {NotFoundError} 404 - User not found.
 */
const getMe = (req, res, next) => {
    next(new SuccessResponse(200, 'User successfully retrieved.', { user: userDto(req.user) }));
};

/**
 * @route PATCH /users/me
 * @desc Update the profile details of the current authenticated user.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {SuccessResponse} 200 - Response containing the user data.
 * @throws  {NotFoundError} 404 - User not found.
 */
const updateById = catchAsync(async (req, res, next) => {
    const { error, value } = userValidator.updateById.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const user = await userService.updateById(req.user._id, value);
    next(new SuccessResponse(200, 'User successfully updated.', { user: userDto(user) }));
});

/**
 * @route PATCH /users/me
 * @desc Delete the current authenticated user.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {empty} 204 - Returns nothing.
 * @throws  {NotFoundError} 404 - User not found.
 */
const deleteMe = catchAsync(async (req, res, next) => {
    await userService.deleteMe(req.user._id);
    next(new SuccessResponse(204));
});

/**
 * @route PUT /users/me/profile-picture
 * @desc Change the current authenticated users profile picture.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {SuccessResponse} 200 - Response containing the user data.
 * @throws {NotFoundError} 404 - User not found.
 */
const changeMyProfilePicture = catchAsync(async (req, res, next) => {
    if (!req.file) throw new UnprocessableEntityError('No image file provided');

    const user = await userService.changeProfilePicture(req.user._id, req.user.profilePicture, req.file.filename);
    next(new SuccessResponse(200, 'Profile picture successfully changed.', { user: userDto(user) }));
});

/**
 * @route DELETE /users/me/profile-picture
 * @description Deletes the current authenticated users profile picture.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {SuccessResponse} 200 - Response containing the user data.
 * @throws  {NotFoundError} 404 - User not found.
 */
const deleteMyProfilePicture = catchAsync(async (req, res, next) => {
    const user = await userService.deleteProfilePicture(req.user._id, req.user.profilePicture);
    next(new SuccessResponse(200, 'Profile picture successfully removed.', { user: userDto(user) }));
});

module.exports = {
    getMe,
    updateById,
    deleteMe,
    changeMyProfilePicture,
    deleteMyProfilePicture,
};
