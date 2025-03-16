const BadRequestError = require('../errors/BadRequestError');
const trackDayRepository = require('../repositories/trackDayRepository');

const getByDate = async (date, user, data) => {
    const trackDay = await trackDayRepository.createOrUpdate(date, user._id, {
        user: user._id,
        date,
        caloricTarget: user.currentCaloricTarget,
        waterTarget: user.currentWaterTarget.value,
    });

    if (!trackDay) throw new BadRequestError('Failed to create track day.');

    return trackDay;
};

module.exports = {
    getByDate,
};
