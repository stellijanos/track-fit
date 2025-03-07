const userRepository = require('../repositories/userRepository');

const getByEmail = async (email) => await userRepository.findByEmail(email);

const getById = async (id) => await userRepository.findById(id);

module.exports = {
    getByEmail,
    getById,
};
