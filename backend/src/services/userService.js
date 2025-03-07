const userRepository = require('../repositories/userRepository');

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

module.exports = {
    getByEmail,
    getById,
    getMe,
    updateMe,
    deleteMe
};
