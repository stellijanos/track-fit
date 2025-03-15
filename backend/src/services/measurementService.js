const BadRequestError = require('../errors/BadRequestError');
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

const getAllByUserId = async (userId) => await measurementRepository.findAllByUserId(userId);

const updateByIdAndUserId = async (id, userId, data) => {
    const updated = await measurementRepository.updateByIdAndUserId(id, userId, {
        weight: data.weight,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.skeletalMuscleMass,
    });

    if (!updated) throw new BadRequestError('Failed to delete measurement: not found or missing permissions.');
    return updated;
};

const deleteByIdAndUserId = async (id, userId) => {
    const deleted = await measurementRepository.deleteByIdAndUserId(id, userId);
    if (!deleted) throw new BadRequestError('Failed to delete measurement: not found or missing permissions.');
};

module.exports = {
    create,
    getAllByUserId,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
