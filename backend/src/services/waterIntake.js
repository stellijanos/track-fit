const NotFoundError = require('../errors/NotFound');
const waterIntakeRepository = require('../repositories/waterIntake');

/**
 * Retrieve water intake entry for a user on a date.
 *
 * @async
 * @param {Date} date - Date of the water intake
 * @param {String} userId - Id of the user
 * @returns {WaterIntake | null} - The found water intake or null
 *
 * Does not throw any error because is optional for the user to enter this intake
 */
const getByDateAndUserId = async (date, userId) =>
    await waterIntakeRepository.findIntakeByDateAndUserId(date, userId);

/**
 * Creaet water intake entry for a user for a date.
 *
 * @async
 * @param {Date} date - Date of the water intake
 * @param {String} userId - Id of the user
 * @returns {WaterIntake} - The created | updated water intake  with the entry
 */
const createEntryByDateAndUserId = async (date, userId, data) =>
    await waterIntakeRepository.createEntryByDateAndUserId(date, userId, {
        quantity: data.quantity * 1,
    });

/**
 * Delete water intake entry for a user on a date.
 * (Also deletes water intake if no entries left to keep the database clean)
 *
 * @async
 * @param {Date} date - Date of the water intake
 * @param {String} userId - Id of the user
 * @returns {void} - Returns nothing
 * @throws {NotFoundError} Water intake not found.
 */
const deleteEntryByIdDateAndUserId = async (id, date, userId) => {
    // 1. Delete water intake entry
    const waterIntake = await waterIntakeRepository.deleteEntryByIdDateAndUserId(id, date, userId);

    // 2. Throw error if the water intake does not exist
    if (!waterIntake) throw new NotFoundError('Water intake');

    // 3. Delete water intake if there are no entries left to keep the database clean
    if (waterIntake.entries.length === 0)
        await waterIntakeRepository.deleteIntakeByDateAndUserId(date, userId);
};

module.exports = {
    getByDateAndUserId,
    createEntryByDateAndUserId,
    deleteEntryByIdDateAndUserId,
};
