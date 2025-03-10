const waterTargetRepository = require('../repositories/waterTargetRepository');

const create = async (userId, data) => {
    const waterTarget = {
        user: userId,
        quantity: data.quantity,
    };

    return await waterTargetRepository.create(waterTarget);
};

const getAllByUserId = async (userId) =>
    await waterTargetRepository.findAllByUserId(userId);

module.exports = {
    create,
    getAllByUserId,
};
