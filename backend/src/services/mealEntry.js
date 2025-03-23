const trackDay = require('../dtos/trackDay');
const BadRequestError = require('../errors/BadRequest');
const InternalServerError = require('../errors/InternalServer');
const NotFoundError = require('../errors/NotFound');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const mealEntryRepository = require('../repositories/mealEntry');
const openAiService = require('./openAi');
const trackDayService = require('./trackDay');

const createMany = async (user, data) => {
    const trackDay = await trackDayService.getByDateAndUser(data.date, user);
    const responseString = await openAiService.getMealEntry({
        description: data.description,
    });

    try {
        const response = JSON.parse(responseString);

        console.log(response);

        const mealEntries = response.map((entry) => ({
            user: user._id,
            trackDay: trackDay._id,
            type: data.type,
            name: entry.name,
            per100: entry.per100,
            totalConsumed: entry.totalConsumed,
        }));

        return await mealEntryRepository.createMany(mealEntries);
    } catch (err) {
        throw new InternalServerError('An error occured, please try again.');
    }
};

const getAllByTrackDayId = async (user, date) => {
    const trackDay = await trackDayService.getByDateAndUser(date, user);
    return await mealEntryRepository.findAllByTrackDayId(trackDay._id);
};

const updateByIdAndTrackDayId = async (user, data) => {
    const mealEntry = await mealEntryRepository.findById(data.mealEntryId);
    if (!mealEntry) throw new NotFoundError('Meal entry');

    const trackDay = await trackDayService.getByDateAndUser(data.date, user);
    if (!mealEntry.trackDay.equals(trackDay._id))
        throw new UnprocessableEntityError('Meal entry does not belong to your trackday.');

    const quantity = data.quantity ?? mealEntry.totalConsumed?.quantity ?? 0;

    const calculateNutrient = (valuePer100) => Number(((valuePer100 * quantity) / 100).toFixed(2));

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

const deleteByIdAndTrackDayId = async (user, data) => {
    const mealEntry = await mealEntryRepository.findById(data.mealEntryId);
    if (!mealEntry) throw new NotFoundError('Meal entry');

    const trackDay = await trackDayService.getByDateAndUser(data.date, user);
    if (!mealEntry.trackDay.equals(trackDay._id))
        throw new UnprocessableEntityError('Meal entry does not belong to your trackday.');

    const deleted = await mealEntryRepository.deleteByIdAndTrackDayId(data.mealEntryId, trackDay._id);
    if (!deleted) throw new BadRequestError('Failed to delete meal entry: not found or missing permissions.');
};

module.exports = {
    createMany,
    getAllByTrackDayId,
    updateByIdAndTrackDayId,
    deleteByIdAndTrackDayId,
};
