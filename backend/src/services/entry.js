const activityEntryService = require('./activityEntry');
const mealEntryService = require('./mealEntry');
const waterIntakeService = require('./waterIntake');

/**
 * Retrieve water intake, activity- and meal entries by date and user
 *
 * @param {String} date - Date of the entries to retrieve
 * @param {User} user - User mongoose object.
 * @returns {Object} - Found entries as a single object
 */
const getByDateAndUserId = async (date, userId) => {
    const activities = await activityEntryService.getAllByDateAndUserId(date, userId);
    const meals = await mealEntryService.getAllByDateAndUserId(date, userId);
    const waterIntake = await waterIntakeService.getByDateAndUserId(date, userId);

    return { activities, meals, waterIntake };
};

module.exports = {
    getByDateAndUserId,
};
