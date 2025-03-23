const trackDay = require('../dtos/trackDay');
const InternalServerError = require('../errors/InternalServer');
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


const getAllByTrackDayId = async(user, date) => {
    console.log(date);
    const trackDay = await trackDayService.getByDateAndUser(date, user);
    console.log(trackDay);
    return await mealEntryRepository.findAllByTrackDayId(trackDay._id);
}

module.exports = {
    createMany,
    getAllByTrackDayId
};
