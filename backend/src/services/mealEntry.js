const openAiService = require('./openAi');
const mealEntryRepository = require('../repositories/mealEntry');
const NotFoundError = require('../errors/NotFound');

/**
 * Create meal entries
 *
 * @async
 * @param {String} userId - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {MealEntry} - Newly created meal entry.
 */
const createMany = async (date, userId, data) => {
    // 1. Retrieve Response based on the meal
    const response = await openAiService.getMealEntry({
        description: data.description,
    });

    // 2. Map meal entries data
    const mealEntries = response.map((entry) => ({
        date,
        user: userId,
        type: data.type,
        name: entry.name,
        per100: entry.per100,
        totalConsumed: entry.totalConsumed,
    }));

    // 3. Return created meal entries
    return await mealEntryRepository.createMany(mealEntries);
};

/**
 * Retrieve all meal entries based on their date and userId
 *
 * @async
 * @param {User} user - User mongoose object.
 * @param {Date} date - Date of the meal entry.
 * @returns {MealEntry[]} - Meal entries for the current date
 */
const getAllByDateAndUserId = async (date, user) =>
    await mealEntryRepository.findAllByDateAndUserId(date, user);

/**
 * Update meal entry
 *
 * @async
 * @param {String} id - Id of the activity entry
 * @param {String} date - date of the activity entry
 * @param {String} userId - Id of the user
 * @returns {MealEntry} - Updated meal entry.
 * @throws {NotFoundError} - Meal entry not found.
 */
const updateByIdAndDateAndUserId = async (id, date, userId, data) => {
    // 1. Retrieve meal entry based on its id, date and userId
    const mealEntry = await mealEntryRepository.findByIdAndDateAndUserId(id, date, userId);

    // 2. Throw error if meal entry was not found
    if (!mealEntry) throw new NotFoundError('Meal entry');

    // 3. Declare quantity as the provided quantity
    const quantity = data.quantity;

    // 4. Calucate totalconsumed if the quantity was provided by the user
    let totalConsumed;
    if (quantity) {
        const calculateNutrient = (valuePer100) =>
            Number(((valuePer100 * quantity) / 100).toFixed(2));

        totalConsumed = {
            quantity,
            kcal: calculateNutrient(mealEntry.per100.kcal),
            protein: calculateNutrient(mealEntry.per100.protein),
            carb: calculateNutrient(mealEntry.per100.carb),
            fat: calculateNutrient(mealEntry.per100.fat),
            fibre: calculateNutrient(mealEntry.per100.fibre),
            salt: calculateNutrient(mealEntry.per100.salt),
        };
    }

    // 5. Update and return the existing meal entry
    return await mealEntryRepository.updateByIdAndDateAndUserId(id, date, userId, {
        name: data.name,
        type: data.type,
        totalConsumed,
    });
};

/**
 * Delete meal entry
 *
 * @async
 * @param {String} id - Id of the activity entry
 * @param {String} date - date of the activity entry
 * @param {String} userId - Id of the user
 * @returns {void} - Returns nothing.
 * @throws {NotFoundError} - Meal entry not found.
 */
const deleteByIdAndDateAndUserId = async (id, date, userId) => {
    // 1. Delete meal entry based on its id, date and userId
    const deleted = await mealEntryRepository.deleteByIdAndDateAndUserId(id, date, userId);

    // 2. Throw error if it was not deleted
    if (!deleted) throw new NotFoundError('Meal entry');
};

module.exports = {
    createMany,
    getAllByDateAndUserId,
    updateByIdAndDateAndUserId,
    deleteByIdAndDateAndUserId,
};
