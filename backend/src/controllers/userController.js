const catchAsync = require('../utils/functions/catchAsync');
const userService = require('../services/userService');
const SuccessResponse = require('../utils/classes/SuccessResponse');
const ErrorResponse = require('../utils/classes/ErrorResponse');

/**
 * @route   GET /users/me
 * @description Fetches the profile details of the authenticated user from the database.
 *
 * @access  Private
 *
 * @param   {import("express").Request} req - Express request object.
 * @param   {import("express").Response} res - Express response object.
 *
 * @returns {Promise<void>} Returns a JSON response containing the user data.
 *
 * @response {200} Success - User profile retrieved successfully.
 * @response {401} Unauthorized - User is not authenticated or token is invalid.
 * @response {403} Forbidden - User does not have permission to access this resource.
 * @response {500} Internal Server Error - Unexpected server error.
 *
 * @throws  {ErrorResponse} 401 - Unauthorized if the user is not authenticated.
 * @throws  {ErrorResponse} 500 - Internal server error if an exception occurs.
 */
const getMe = (req, res) => {
    const user = userService.getMe(req.user);
    return res.status(200).json(new SuccessResponse('User successfully received.', { user }));
};

/**
 * @route   PATCH /users/me
 * @description Updates the profile details of the authenticated user from the database.
 * Accepts: firstName, lastName, email, phone, birthDate, gender and height only
 *
 * @access  Private
 *
 * @param   {import("express").Request} req - Express request object.
 * @param   {import("express").Response} res - Express response object.
 *
 * @returns {Promise<void>} Returns a JSON response containing the user data.
 *
 * @response {200} Success - User profile updated successfully.
 * @response {401} Unauthorized - User is not authenticated or token is invalid.
 * @response {403} Forbidden - User does not have permission to access this resource.
 * @response {500} Internal Server Error - Unexpected server error.
 *
 * @throws  {ErrorResponse} 401 - Unauthorized if the user is not authenticated.
 * @throws  {ErrorResponse} 500 - Internal server error if an exception occurs.
 */
const updateMe = catchAsync(async (req, res) => {
    const user = await userService.updateMe(req.user._id, req.body);
    return res.status(200).json(new SuccessResponse('User successfully updated.', { user }));
});

/**
 * @route   DELETE /users/me
 * @description Deletes the authenticated user from the database.
 *
 * @access  Private
 *
 * @param   {import("express").Request} req - Express request object.
 * @param   {import("express").Response} res - Express response object.
 *
 * @returns {Promise<void>} Returns a JSON response containing the user data.
 *
 * @response {200} Success - User deleted successfully.
 * @response {401} Unauthorized - User is not authenticated or token is invalid.
 * @response {403} Forbidden - User does not have permission to access this resource.
 * @response {500} Internal Server Error - Unexpected server error.
 *
 * @throws  {ErrorResponse} 401 - Unauthorized if the user is not authenticated.
 * @throws  {ErrorResponse} 500 - Internal server error if an exception occurs.
 */
const deleteMe = catchAsync(async (req, res) => {
    await userService.deleteMe(req.user._id);
    res.status(204).send();
});

/**
 * @route   PUT /users/me/profile-picture
 * @description Changes the authenticated users profile picture:
 *
 * @access  Private
 *
 * @param   {import("express").Request} req - Express request object.
 * @param   {import("express").Response} res - Express response object.
 *
 * @returns {Promise<void>} Returns a JSON response containing the user data.
 *
 * @response {200} Success - Profile picture changed successfully.
 * @response {401} Unauthorized - User is not authenticated or token is invalid.
 * @response {403} Forbidden - User does not have permission to access this resource.
 * @response {422} Unprocessable Entity - No image file provided.
 * @response {500} Internal Server Error - Unexpected server error.
 *
 * @throws  {ErrorResponse} 401 - Unauthorized if the user is not authenticated.
 * @throws  {ErrorResponse} 500 - Internal server error if an exception occurs.
 */
const changeMyProfilePicture = catchAsync(async (req, res) => {
    if (!req.file) throw new UnprocessableEntityError('No image file provided');

    const user = await userService.changeProfilePicture(req.user._id, req.user.profilePicture, req.file.filename);
    res.status(200).json(new SuccessResponse('Profile picture successfully changed.', { user }));
});

/**
 * @route   DELETE /users/me/profile-picture
 * @description Deletes the authenticated users uploaded profile picture.
 *
 * @access  Private
 *
 * @param   {import("express").Request} req - Express request object.
 * @param   {import("express").Response} res - Express response object.
 *
 * @returns {Promise<void>} Returns a JSON response containing the user data.
 *
 * @response {200} Success - Profile picture changed successfully.
 * @response {401} Unauthorized - User is not authenticated or token is invalid.
 * @response {403} Forbidden - User does not have permission to access this resource.
 * @response {500} Internal Server Error - Unexpected server error.
 *
 * @throws  {ErrorResponse} 401 - Unauthorized if the user is not authenticated.
 * @throws  {ErrorResponse} 500 - Internal server error if an exception occurs.
 */
const deleteMyProfilePicture = catchAsync(async (req, res) => {
    const user = await userService.deleteProfilePicture(req.user._id, req.user.profilePicture);
    res.status(200).json(new SuccessResponse('Profile picture successfully removed.', { user }));
});

module.exports = {
    getMe,
    updateMe,
    deleteMe,
    changeMyProfilePicture,
    deleteMyProfilePicture,
};
