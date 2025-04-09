const activityEntryRepository = require('../repositories/activityEntry');
const openAiService = require('./openAi');
const NotFoundError = require('../errors/NotFound');

/**
 * Create activity entry based on user and activity information.
 *
 * @async
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {ActivityEntry} - Newly created ActivityEntry.
 */
const create = async (user, data) => {
    // 1. set the information for OpenAI service
    const info = {
        user: {
            gender: user.gender,
            birthDate: user.birthDate,
            height: user.height,
            lastMeasurement: user.lastMeasurement,
        },
        activity: {
            name: data.name,
            durationInM: data.durationInM,
            additionalInfo: data.additionalInfo,
        },
    };

    // 2. Retrieve response form OpenAI service
    const response = await openAiService.getActivityData(info);

    // 3. create activity entry then return it
    return await activityEntryRepository.create({
        date: data.date,
        user: user._id,
        name: response.name,
        caloriesPerHour: response.caloriesPerHour,
        totalCalories: (response.caloriesPerHour * data.durationInM) / 60,
        durationInM: data.durationInM,
    });
};

/**
 * Retrieve all activity entries based on user and date.
 *
 * @async
 * @param {String} date - Date of the activity entries.
 * @param {String} userId - Id of the user.
 * @returns {ActivityEntry[]} - Activity Entries of the user for the provided date.
 */
const getAllByDateAndUserId = async (date, userId) =>
    await activityEntryRepository.findAllByDateAndUserId(date, userId);

/**
 * Update activity Entry based on user, date and activity information.
 *
 * @async
 * @param {String} id - Id of the activity entry
 * @param {String} date - date of the activity entry
 * @param {String} userId - Id of the user
 * @param {Object} data - Activity entry information
 * @returns {ActivityEntry} - Newly created activity entry
 * @throws {NotFoundError} - Activity entry not found
 */
const updateByIdAndDateAndUserId = async (id, date, userId, data) => {
    // 1. Retrieve for activity entry
    const activityEntry = await activityEntryRepository.findByIdAndDateAndUserId(id, date, userId);

    // 2. Throw error if not found
    if (!activityEntry) throw new NotFoundError('Activity entry');

    // 3. Update then Return updated activity entry
    return await activityEntryRepository.updateByIdAndDateAndUserId(id, date, userId, {
        name: data.name,
        caloriesPerHour: activityEntry.caloriesPerHour,
        totalCalories: (
            (activityEntry.caloriesPerHour * (data.durationInM || activityEntry.durationInM)) /
            60
        ).toFixed(2),
        durationInM: data.durationInM,
    });
};

/**
 * Delete activity Entry based on id
 *
 * @async
 * @param {String} id - Id of the activity entry
 * @param {String} date - date of the activity entry
 * @param {String} userId - Id of the user
 * @returns {void} - Returns nothing
 * @throws {NotFoundError} - Activity entry not found
 */
const deleteByIdAndDateAndUserId = async (id, date, userId) => {
    // 1. Delete activity entry
    const deleted = await activityEntryRepository.deleteByIdAndDateAndUserId(id, date, userId);

    // Throw error if not deleted
    if (!deleted) throw new NotFoundError('Activity entry');
};

module.exports = {
    create,
    getAllByDateAndUserId,
    updateByIdAndDateAndUserId,
    deleteByIdAndDateAndUserId,
};
