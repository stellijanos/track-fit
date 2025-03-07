const fs = require('fs');
const sharp = require('sharp');
const constants = require('../config/constants');
const defaults = require('../config/dbDefaults');
const userRepository = require('../repositories/userRepository');

/**
 * Helper Functions
 */

/**
 * @function removeIfExists
 * @summary Removes image if it exists.
 * @description This method removes user image if it exists and is not the default profile picutre for a user.
 *
 * @param   {String} image - The image to be removed
 * @returns {void} This function does not return anything
 */
const removeIfExists = (image) => {
    const imagePath = `${constants.PROFILE_PICTURE_DIR}/${image}`;

    if (image !== defaults.PROFILE_PICTURE && fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
};

/**
 * Service Functions
 */

/**
 * @function getByEmail
 * @summary Retrieves the user by email.
 * @description This method retrieves the user by given email address.
 *
 * @param   {String} email - The email of the user.
 * @returns {User} This function returns the found user based on email.
 * @throws  {Error} If the retrieval fails due to database issues or invalid user email.
 */
const getByEmail = async (email) => await userRepository.findByEmail(email);

/**
 * @function getById
 * @summary Retrieves the user by id.
 * @description This method retrieves the user by given id address.
 *
 * @param   {ObjectId} id - The id of the user.
 * @returns {User} This function returns the found user based on it's unique ID.
 * @throws  {Error} If the retrieval fails due to database issues or invalid user ID.
 */
const getById = async (id) => await userRepository.findById(id);

/**
 * @function getById
 * @summary Retrieves the passed in user without security related fields.
 * @description This method retrieves the user by given id address.
 *
 * @param   {User} user - the user
 * @returns {User} This function returns the user withpout ecurity related fields.
 */
const getMe = (user) => {
    user.password = undefined;
    user.passwordResetToken = undefined;
    return user;
};

/**
 * @function updateMe
 * @summary Updates the user by the provided ID.
 * @description This method updates the user by given id address.
 *
 * @param   {ObjectId} id - The ID of the user.
 * @param   {Object} data - The data to be updated.
 * @returns {User} This function returns the updated user.
 * @throws  {Error} If the update fails due to database issues or invalid user ID.
 */
const updateMe = async (userId, data) => {
    const updatedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        gender: data.gender,
        height: data.height,
    };

    const updated = await userRepository.updateOne(userId, updatedData);
    updated.password = undefined;
    updated.passwordResetToken = undefined;

    return updated;
};

/**
 * @function updateMe
 * @summary Deletes the user by the provided ID.
 * @description This method deletes the user by given id address.
 *
 * @param   {ObjectId} id - The ID of the user.
 * @returns {void} This function returns nothing.
 * @throws  {Error} If the deletion fails due to database issues or invalid user ID.
 */
const deleteMe = async (userId) => {
    await userRepository.deleteById(userId);
};

/**
 * @function changeProfilePicture
 * @summary Updates the users profile picture
 * @description This method updates the user profile picture and in the meanwhile
 * removes the current one if that is not the default picture for the user.
 *
 * @param   {ObjectId} id - The id of the user.
 * @param   {String} currentImage - The current profile picture of the user
 * @param   {String} filename - The filename of the temporary uploaded image to be edited with sharp
 * @returns {User} This function returns the updated user by it's changed profile picture.
 * @throws  {Error} If the update fails due to database issues or invalid user ID.
 */
const changeProfilePicture = async (userId, currentImage, filename) => {
    const profilePicture = `${userId}-${Date.now()}.png`;
    const source = `${constants.TEMP_UPLOAD_DIR}/${filename}`;
    const destination = `${constants.PROFILE_PICTURE_DIR}/${profilePicture}`;

    await sharp(source).resize(512, 512).toFormat('png').toFile(destination);
    fs.unlinkSync(source);

    const user = await userRepository.updateOne(userId, { profilePicture });
    if (user.profilePicture !== currentImage) {
        removeIfExists(currentImage);
    }
    return user;
};

/**
 * @function changeProfilePicture
 * @summary Deletes the users profile picture
 * @description This method deletes the user profile picture and in the meanwhile
 * removes it if that is not the default picture for the user.
 *
 * @param   {ObjectId} id - The id of the user.
 * @param   {String} currentImage - The current profile picture of the user
 * @returns {User} This function returns the updated user by it's changed profile picture.
 * @throws  {Error} If the update fails due to database issues or invalid user ID.
 */
const deleteProfilePicture = async (userId, currentImage) => {
    const user = await userRepository.updateOne(userId, {
        profilePicture: defaults.PROFILE_PICTURE,
    });
    removeIfExists(currentImage);
    return user;
};

module.exports = {
    getByEmail,
    getById,
    getMe,
    updateMe,
    deleteMe,
    changeProfilePicture,
    deleteProfilePicture,
};
