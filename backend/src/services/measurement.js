const measurementRepository = require('../repositories/measurement');
const userService = require('./user');

const BadRequestError = require('../errors/BadRequest');

const setUserLastMeasurement = async (userId) => {
    const lastMeasurement = await measurementRepository.getLastMeasurementByUserId(userId);
    console.log(lastMeasurement);
    await userService.updateById(userId, { lastMeasurement: lastMeasurement._id });
};

const create = async (userId, data) => {
    const measurement = {
        user: userId,
        weight: data.weight,
        date: data.date,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.skeletalMuscleMass,
    };
    const created = await measurementRepository.createOne(measurement);

    await setUserLastMeasurement(userId);

    return created;
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

    await setUserLastMeasurement(userId);
};

module.exports = {
    create,
    getAllByUserId,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
