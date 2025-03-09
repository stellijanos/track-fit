const measurementRepository = require('../repositories/measurementRepository');
const ErrorResponse = require('../utils/classes/ErrorResponse');

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

const deleteByIdAndUserId = async (id, userId) => {
    const deleted = await measurementRepository.deleteByIdAndUserId(id, userId);
    if (!deleted) {
        throw new ErrorResponse(
            400,
            'Failed to delete measurement: not found or missing permissions.'
        );
    }
};

module.exports = {
    create,
    getAllByUserId,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
