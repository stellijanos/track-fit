const fs = require('fs');
const sharp = require('sharp');
const constants = require('../config/constants');
const defaults = require('../config/dbDefaults');
const userRepository = require('../repositories/userRepository');

/**
 * Helper Functions
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

const getByEmail = async (email) => await userRepository.findByEmail(email);

const getById = async (id) => await userRepository.findById(id);

const getMe = (user) => {
    user.password = undefined;
    user.passwordResetToken = undefined;
    return user;
};

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

const deleteMe = async (userId) => {
    const deleted = await userRepository.deleteById(userId);
};

const changeProfilePicture = async (userId, oldProfilePicture, filename) => {
    const profilePicture = `${userId}-${Date.now()}.png`;
    const source = `${constants.TEMP_UPLOAD_DIR}/${filename}`;
    const destination = `${constants.PROFILE_PICTURE_DIR}/${profilePicture}`;

    await sharp(source).resize(512, 512).toFormat('png').toFile(destination);
    fs.unlinkSync(source);

    const user = await userRepository.updateOne(userId, { profilePicture });
    if (user.profilePicture !== oldProfilePicture) {
        removeIfExists(oldProfilePicture);
    }
    return user;
};

module.exports = {
    getByEmail,
    getById,
    getMe,
    updateMe,
    deleteMe,
    changeProfilePicture,
};
