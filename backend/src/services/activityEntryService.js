const visibility = require('../enums/visbility');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const activityEntryRepository = require('../repositories/activityEntryRepository');
const activityService = require('../services/activityService');
const trackDayService = require('../services/trackDayService');

const isAllowedToUse = (activity, user) => activity.visibility === visibility.PUBLIC || activity.user.equals(user._id);

const create = async (user, data) => {
    const activity = await activityService.getById(data.activityId);

    if (!isAllowedToUse(activity, user)) throw new ForbiddenError('You are not allowed to use.');

    const trackDay = await trackDayService.getByDateAndUser(data.date, user);
    const created = await activityEntryRepository.create({
        trackDay: trackDay._id,
        name: activity.name,
        caloriesPerHour: activity.caloriesPerHour,
        totalCalories: activity.caloriesPerHour * data.durationInM,
        durationInM: data.durationInM,
    });

    if (!created) throw new BadRequestError('Failed to create activity entry.');
    return created;
};

module.exports = {
    create,
};
