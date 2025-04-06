const trackDay = require('../dtos/trackDay');
const BadRequestError = require('../errors/BadRequest');
const InternalServerError = require('../errors/InternalServer');
const NotFoundError = require('../errors/NotFound');
const ForbiddenError = require('../errors/Forbidden');
const mealEntryRepository = require('../repositories/mealEntry');
const openAiService = require('./openAi');
const trackDayService = require('./trackDay');

/**
 * Create meal entries for the user based on its input
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {MealEntry} - Newly created meal entry.
 * @throws {BadRequestError} - Failed to create track day.
 * @throws {BadRequestError} - Failed to create track day.
 * @throws {InternalServerError} - An error occured, please try again.
 */
const createMany = async (user, data) => {
    // 1. Retrieve trackday based on user and date
    const trackDay = await trackDayService.getByDateAndUser(data.date, user);

    // 2. Retrieve Response based on the meal
    const responseString = await openAiService.getMealEntry({
        description: data.description,
    });

    try {
        // 3. Stringify the response
        const response = JSON.parse(responseString);

        // 4. Map meal entries data
        const mealEntries = response.map((entry) => ({
            user: user._id,
            trackDay: trackDay._id,
            type: data.type,
            name: entry.name,
            per100: entry.per100,
            totalConsumed: entry.totalConsumed,
        }));

        // 5. Return created meal entries
        return await mealEntryRepository.createMany(mealEntries);
    } catch (err) {
        // 6. Catch and rethrow any errors from the try-block
        throw new InternalServerError('An error occured, please try again.');
    }
};

/**
 * Retrieve all meal entries based on user and trackday
 *
 * @param {User} user - User mongoose object.
 * @param {Date} date - Date of the trackday.
 * @returns {MealEntry[]} - Meal entries for the current date
 */
const getAllByTrackDayId = async (user, date) => {
    // 1. Retrieve trackday by user and date
    const trackDay = await trackDayService.getByDateAndUser(date, user);

    // 2. Retrieve all meal entries for that trackday
    return await mealEntryRepository.findAllByTrackDayId(trackDay._id);
};

/**
 * Update meal entry of the user for a
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {MealEntry} - Updated meal entry.
 * @throws {NotFoundError} - Meal entry not found.
 * @throws {ForbiddenError} - Meal entry does not belong to your trackday.
 * @throws {BadRequestError} - Failed to create track day.
 */
const updateByIdAndTrackDayId = async (user, data) => {
    // 1. Retrieve track day of the user
    const trackDay = await trackDayService.getByDateAndUser(data.date, user);

    // 2. Retrieve meal entry based on its id and trackday
    const mealEntry = await mealEntryRepository.findByIdAndTrackDayId(data.mealEntryId, trackDay._id);

    // 3. Throw error if meal entry was not found
    if (!mealEntry) throw new NotFoundError('Meal entry');

    // 4. Declare quantity as the provided quantity or keep as it is or 0 for fallback
    const quantity = data.quantity ?? mealEntry.totalConsumed?.quantity ?? 0;

    // 5. Function expression for calculating nutrients and kcal values with 2 digit decimal place
    const calculateNutrient = (valuePer100) => Number(((valuePer100 * quantity) / 100).toFixed(2));

    // 6. Update and return the existing meal entry
    return await mealEntryRepository.updateById(data.mealEntryId, {
        name: data.name,
        type: data.type,
        totalConsumed: {
            quantity,
            kcal: calculateNutrient(mealEntry.per100.kcal),
            protein: calculateNutrient(mealEntry.per100.protein),
            carb: calculateNutrient(mealEntry.per100.carb),
            fat: calculateNutrient(mealEntry.per100.fat),
            fibre: calculateNutrient(mealEntry.per100.fibre),
            salt: calculateNutrient(mealEntry.per100.salt),
        },
    });
};

/**
 * Delete meal entry based on user and activity information.
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {void} - Returns nothing.
 * @throws {BadRequestError} - Failed to delete meal entry: not found or missing permissions.
 * @throws {BadRequestError} - Failed to create track day.
 */
const deleteByIdAndTrackDayId = async (user, data) => {
    // 1. Retrieve track day of the user
    const trackDay = await trackDayService.getByDateAndUser(data.date, user);

    // 2, Delete meal entry based on id and track day id
    const deleted = await mealEntryRepository.deleteByIdAndTrackDayId(data.mealEntryId, trackDay._id);

    // 3. Throw error if it was not deleted
    if (!deleted) throw new BadRequestError('Failed to delete meal entry: not found or missing permissions.');
};

module.exports = {
    createMany,
    getAllByTrackDayId,
    updateByIdAndTrackDayId,
    deleteByIdAndTrackDayId,
};
