const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/userService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const UnprocessableEntityError = require('../errors/UnprocessableEntityError');
const userDto = require('../dtos/userDto');

/**
 * @route GET /users/me
 * @desc Fetch the profile details of the current authenticated user.
 * @access Private
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {SuccessResponse} 200 - Response containing the user data.
 * @throws  {NotFoundError} 404 - User not found.
 */
const getMe = (req, res) => {
    res.status(200).json(new SuccessResponse('User successfully received.', { user: userDto.response(req.user) }));
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
const updateMe = catchAsync(async (req, res) => {
    const { error, value } = userDto.updateMe.validate(req.body);
    if (error) throw new UnprocessableEntityError(error.message);

    const user = await userService.updateMe(req.user._id, value);

    res.status(200).json(new SuccessResponse('User successfully updated.', { user: userDto.response(user) }));
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
const deleteMe = catchAsync(async (req, res) => {
    await userService.deleteMe(req.user._id);

    res.status(204).send();
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
const changeMyProfilePicture = catchAsync(async (req, res) => {
    if (!req.file) throw new UnprocessableEntityError('No image file provided');

    const user = await userService.changeProfilePicture(req.user._id, req.user.profilePicture, req.file.filename);

    res.status(200).json(
        new SuccessResponse('Profile picture successfully changed.', { user: userDto.response(user) })
    );
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
const deleteMyProfilePicture = catchAsync(async (req, res) => {
    const user = await userService.deleteProfilePicture(req.user._id, req.user.profilePicture);

    res.status(200).json(
        new SuccessResponse('Profile picture successfully removed.', { user: userDto.response(user) })
    );
});

module.exports = {
    getMe,
    updateMe,
    deleteMe,
    changeMyProfilePicture,
    deleteMyProfilePicture,
};
