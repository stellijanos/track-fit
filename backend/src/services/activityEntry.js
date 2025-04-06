const activityEntryRepository = require('../repositories/activityEntry');
const trackDayService = require('./trackDay');
const openAiService = require('./openAi');

const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');

/**
 * Create acitivty entry based on user and activity information.
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {ActivityEntry} - Newly created ActivityEntry.
 * @throws {BadRequestError} - Failed to create activity entry.
 * @throws {BadRequestError} - Failed to create track day.
 */
const create = async (user, data) => {
    // 1. Retrieve / create trackday
    const trackDay = await trackDayService.getByDateAndUser(data.date, user);

    // 2. set the information for OpenAi service
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

    // 3. Retrieve response and parse it
    const responseString = await openAiService.getActivityData(info);
    const response = JSON.parse(responseString);

    // 4. create activity and return it
    return await activityEntryRepository.create({
        trackDay: trackDay._id,
        name: response.name,
        caloriesPerHour: response.caloriesPerHour,
        totalCalories: (response.caloriesPerHour * data.durationInM) / 60,
        durationInM: data.durationInM,
    });
};

/**
 * Retrieve all acitivty entries based on user and date.
 *
 * @async
 * @param {User} user - User mongoose object.
 * @param {String} date - Date of the activity entries.
 * @returns {ActivityEntry[]} - Activity Entries of the user for the provided date.
 * @throws {BadRequestError} - Failed to create track day.
 */
const getAllByUserAndDate = async (user, date) => {
    // 1. Retrieve / create trackday
    const trackDay = await trackDayService.getByDateAndUser(date, user);

    // 2. Return all the found activity entries for the specific date (trackday)
    return await activityEntryRepository.findAllByTrackDayId(trackDay._id);
};

/**
 * Update acitivty Entry based on user, date and activity information.
 *
 * @async
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {ActivityEntry} - Newly created ActivityEntry.
 * @throws {NotFoundError} - Activity entry not found.
 * @throws {BadRequestError} - Failed to create track day.
 */
const updateByIdAndTrackDayId = async (id, date, user, data) => {
    // 1. Retrieve / create trackday
    const trackDay = await trackDayService.getByDateAndUser(date, user);

    // 2. Check for existence of activity entry
    const activityEntry = await activityEntryRepository.findByIdAndTrackDayId(id, trackDay._id);
    if (!activityEntry) throw new NotFoundError('Activity entry');

    // 3. Update activity entry by its ID
    const updated = await activityEntryRepository.updateById(id, {
        name: data.name,
        caloriesPerHour: activityEntry.caloriesPerHour,
        totalCalories: ((activityEntry.caloriesPerHour * (data.durationInM || activityEntry.durationInM)) / 60).toFixed(2),
        durationInM: data.durationInM,
    });

    // 4. Check if activity entry updated successfully
    if (!updated) throw new BadRequestError('Failed to update activity entry.');

    // 5. Return updated actiivty entry
    return updated;
};

/**
 * Delete acitivty Entry based on id
 *
 * @async
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {void} - Returns nothing.
 * @throws {BadRequestError} - Failed to delete activity entry.
 */
const deleteByIdAndTrackDayId = async (id, date, user) => {
    // 1. Retrieve / create trackday
    const trackDay = await trackDayService.getByDateAndUser(date, user);

    // 2. Delete activity entry
    const deleted = await activityEntryRepository.deleteByIdAndTrackDayId(id, trackDay._id);

    // 3. Check if it was deleted
    if (!deleted) throw new BadRequestError('Failed to delete activity entry: not found or missing permissions.');
};

module.exports = {
    create,
    getAllByUserAndDate,
    updateByIdAndTrackDayId,
    deleteByIdAndTrackDayId,
};
