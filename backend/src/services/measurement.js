const measurementRepository = require('../repositories/measurement');
const userService = require('./user');
const NotFoundError = require('../errors/NotFound');

/**
 * Helper functions
 */

/**
 * Create measurement for the user
 *
 * @param {ObjectId} userId - Id of the user
 * @returns {void} - Returns nothing
 * @throws {NotFoundError} - User not found
 */
const setUserLastMeasurement = async (userId) => {
    const lastMeasurement = await measurementRepository.getLastMeasurementByUserId(userId);
    await userService.updateById(userId, { lastMeasurement: lastMeasurement._id });
};

/**
 * Service functions
 */

/**
 * Create measurement for the user based on its input
 *
 * @param {ObjectId} userId - Id of the user
 * @param {Object} data - Measurement data provided by the user
 * @returns {Measurement} - Newly created meal entry
 * @throws {NotFoundError} - User not found
 */
const create = async (userId, data) => {
    // 1. Create measurement
    const measurement = await measurementRepository.createOne({
        user: userId,
        weight: data.weight,
        date: data.date,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.skeletalMuscleMass,
    });

    // 2. Set the users last measurement
    await setUserLastMeasurement(userId);

    // 3. Return the created measurement
    return measurement;
};

/**
 * Retrieve all measurements based on user id
 *
 * @param {ObjectId} userId - Id of the user
 * @returns {Measurement[]} - Found measurements
 */
const getAllByUserId = async (userId) => await measurementRepository.findAllByUserId(userId);

/**
 * Update measurement based on its id and user id
 *
 * @param {String} id - Id of the measurement
 * @param {ObjectId} userId - Id of the user
 * @param {Object} data - Measurement information
 * @returns {Measurement} - Updated measurement
 * @throws {NotFoundError} - Measurement not found
 */
const updateByIdAndUserId = async (id, userId, data) => {
    // 1. Update the measurement
    const updated = await measurementRepository.updateByIdAndUserId(id, userId, {
        weight: data.weight,
        bodyFatPercentage: data.bodyFatPercentage,
        skeletalMuscleMass: data.skeletalMuscleMass,
    });

    // 2. Throw error if could not be updated
    if (!updated) throw new NotFoundError('Measurement');

    // 3. Return the updated measurement
    return updated;
};

/**
 * Delete measurement based on its id and user id
 *
 * @param {String} id - Id of the measurement
 * @param {ObjectId} userId - Id of the user
 * @returns {void} - Returns nothing
 * @throws {NotFoundError} - Measurement not found
 */
const deleteByIdAndUserId = async (id, userId) => {
    // 1. Delete measurement
    const deleted = await measurementRepository.deleteByIdAndUserId(id, userId);

    // 2. Throw error if measurement could not be deleted
    if (!deleted) throw new NotFoundError('Measurement');

    // 3. Reset the last measurement of the user
    await setUserLastMeasurement(userId);
};

module.exports = {
    create,
    getAllByUserId,
    updateByIdAndUserId,
    deleteByIdAndUserId,
};
