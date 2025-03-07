const userRepository = require('../repositories/userRepository');

const getByEmail = async (email) => await userRepository.findByEmail(email);

const getById = async (id) => await userRepository.findById(id);

const getMe = (user) => {
    user.password = undefined;
    user.passwordResetToken = undefined;
    return user;
};

module.exports = {
    getByEmail,
    getById,
    getMe,
};
