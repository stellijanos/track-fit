const BadRequestError = require('../errors/BadRequestError');
const trackDayRepository = require('../repositories/trackDayRepository');

const getByDateAndUser = async (date, user) => {
    const trackDay = await trackDayRepository.createOrUpdate(date, user._id, {
        user: user._id,
        date,
        caloricTarget: user.currentCaloricTarget,
        waterTarget: user.currentWaterTarget.value,
    });

    if (!trackDay) throw new BadRequestError('Failed to create track day.');

    return trackDay;
};

const addWaterIntake = async (date, user, quantity) => {
    const trackDay = await getByDateAndUser(date, user);
    const waterIntake = trackDay.waterIntake + quantity;
    return await trackDayRepository.createOrUpdate(date, user, { waterIntake });
};

const setWaterIntake = async (date, user, quantity) => {
    await getByDateAndUser(date, user);
    return await trackDayRepository.createOrUpdate(date, user, { waterIntake: quantity });
};

module.exports = {
    getByDateAndUser,
    addWaterIntake,
    setWaterIntake,
};
