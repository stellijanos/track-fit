const userRepository = require('../repositories/userRepository');

const getByEmail = async (email) => {
    return await userRepository.getByEmail(email);
};

module.exports = {
    getByEmail,
};
