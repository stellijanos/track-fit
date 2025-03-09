const measurementRepository = require('../repositories/measurementRepository');

const create = async (userId, data) => {
    const measurement = {
        user: userId,
        weight: data.weight,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.bodyFatPercentage,
    };

    return await measurementRepository.createOne(measurement);
};

const getAllByUserId = async (userId) =>
    await measurementRepository.findAllByUserId(userId);

module.exports = {
    create,
    getAllByUserId,
};
