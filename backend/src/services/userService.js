const fs = require('fs');
const sharp = require('sharp');
const constants = require('../config/constants');
const defaults = require('../config/dbDefaults');
const NotFoundError = require('../errors/NotFoundError');
const userRepository = require('../repositories/userRepository');

/**
 * Helper Functions
 */

/**
 * @desc Removes user image if it exists and is not the default profile picutre for a user.
 * @param {String} image - The image to be removed
 * @returns {void} - Returns nothing
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
 * @async
 * @desc Retrieve the user by email address.
 * @param {String} email - The email of the user.
 * @returns {User} This function returns the found user based on email.
 * @throws {NotFoundError} If the retrieval fails due to database issues or invalid user email.
 */
const getByEmail = async (email) => {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new NotFoundError('User');
    return user;
};

/**
 * @async
 * @desc Retrieve user by its ID.
 * @param {String} id - The ID of the user.
 * @returns {User} - The found user.
 * @throws {NotFoundError} User not found.
 */
const getById = async (id) => {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError('User');
    return user;
};

/**
 * @async
 * @desc Update user by its ID.
 * @param {String} id - The ID of the user.
 * @param {Object} data - The data to be updated.
 * @returns {User} - The updated user.
 * @throws {NotFoundError} User not found.
 */
const updateMe = async (Id, data) => {
    const updatedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        birthDate: data.birthDate,
        gender: data.gender,
        height: data.height,
    };

    const updated = await userRepository.updateById(Id, updatedData);
    if (!updated) throw new NotFoundError('User');
    return updated;
};

/**
 * @async
 * @desc Delete user by its ID.
 * @param {String} id - The ID of the user.
 * @returns {void} - Return nothing.
 */
const deleteMe = async (id) => {
    await userRepository.deleteById(id);
};

/**
 * @async
 * @desc This method updates the user profile picture and in the meanwhile removes
 *          the current one if that is not the default picture for the user.
 * @param {String} id - The ID of the user.
 * @param {String} currentImage - The current profile picture of the user.
 * @param {String} filename - The filename of the temporary uploaded image to be edited with sharp
 * @returns {User} - User with updated profile picture.
 */
const changeProfilePicture = async (userId, currentImage, filename) => {
    const profilePicture = `${userId}-${Date.now()}.png`;
    const source = `${constants.TEMP_UPLOAD_DIR}/${filename}`;
    const destination = `${constants.PROFILE_PICTURE_DIR}/${profilePicture}`;

    await sharp(source).resize(512, 512).toFormat('png').toFile(destination);
    fs.unlinkSync(source);

    const user = await userRepository.updateById(userId, { profilePicture });
    if (user.profilePicture !== currentImage) {
        removeIfExists(currentImage);
    }
    return user;
};

/**
 * @async
 * @desc This method deletes the user profile picture and in the meanwhile
 *          removes it if that is not the default picture for the user.
 * @param {ObjectId} id - The id of the user.
 * @param {String} currentImage - The current profile picture of the user
 * @returns {User} - User with deleted profile picture.
 */
const deleteProfilePicture = async (userId, currentImage) => {
    const user = await userRepository.updateById(userId, {
        profilePicture: defaults.PROFILE_PICTURE,
    });
    removeIfExists(currentImage);
    return user;
};

module.exports = {
    getByEmail,
    getById,
    updateMe,
    deleteMe,
    changeProfilePicture,
    deleteProfilePicture,
};
