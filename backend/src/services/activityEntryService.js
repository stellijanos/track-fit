const visibility = require('../enums/visbility');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const activityEntryRepository = require('../repositories/activityEntryRepository');
const activityService = require('../services/activityService');
const trackDayService = require('../services/trackDayService');

const isAllowedToUse = (activity, user) => activity.visibility === visibility.PUBLIC || activity.user.equals(user._id);

const create = async (user, data) => {
    const activity = await activityService.getById(data.activityId);

    if (!isAllowedToUse(activity, user)) throw new ForbiddenError('You are not allowed to use.');

    const trackDay = await trackDayService.getByDateAndUser(data.date, user);
    console.log(trackDay);
    const created = await activityEntryRepository.create({
        trackDay: trackDay._id,
        name: activity.name,
        caloriesPerHour: activity.caloriesPerHour,
        totalCalories: (activity.caloriesPerHour * data.durationInM) / 60,
        durationInM: data.durationInM,
    });

    if (!created) throw new BadRequestError('Failed to create activity entry.');
    return created;
};

const getAllByUserAndDate = async (user, date) => {
    const trackDay = await trackDayService.getByDateAndUser(date, user);
    return await activityEntryRepository.findAllByTrackDayId(trackDay._id);
};

const updateById = async (data) => {
    const activityEntry = await activityEntryRepository.findById(data.activityEntryId);
    if (!activityEntry) throw new NotFoundError('Activity entry');

    const updated = await activityEntryRepository.updateById(data.activityEntryId, {
        name: data.name,
        caloriesPerHour: activityEntry.caloriesPerHour,
        totalCalories: ((activityEntry.caloriesPerHour * data.durationInM) / 60).toFixed(2),
        durationInM: data.durationInM,
    });

    if (!updated) throw new BadRequestError('Failed to update activity entry.');
    return updated;
};

module.exports = {
    create,
    getAllByUserAndDate,
    updateById,
};
