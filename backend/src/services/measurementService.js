const measurementRepository = require('../repositories/measurementRepository');

const create = async (userId, data) => {
    const measurement = {
        user: userId,
        weight: data.weight,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.skeletalMuscleMass,
    };

    return await measurementRepository.createOne(measurement);
};

const getAllByUserId = async (userId) =>
    await measurementRepository.findAllByUserId(userId);

const updateByIdAndUserId = async (id, userId, data) => {
    const updated = {
        weight: data.weight,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.skeletalMuscleMass,
    };

    return await measurementRepository.updateByIdAndUserId(id, userId, updated);
};

module.exports = {
    create,
    getAllByUserId,
    updateByIdAndUserId,
};
