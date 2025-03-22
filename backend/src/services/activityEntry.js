const activityEntryRepository = require('../repositories/activityEntry');
const trackDayService = require('./trackDay');

const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');

const create = async (user, data) => {
    const trackDay = await trackDayService.getByDateAndUser(data.date, user);

    const created = await activityEntryRepository.create({
        trackDay: trackDay._id,
        name: data.name,
        caloriesPerHour: data.caloriesPerHour,
        totalCalories: (data.caloriesPerHour * data.durationInM) / 60,
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

const deleteById = async (id) => {
    const deleted = await activityEntryRepository.deleteById(id);
    if (!deleted) throw new BadRequestError('Failed to delete activity entry.');
};

module.exports = {
    create,
    getAllByUserAndDate,
    updateById,
    deleteById,
};
