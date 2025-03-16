const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const trackDayRepository = require('../repositories/trackDayRepository');

const getByDateAndUser = async (date, user, session = null) => {
    const trackDay = await trackDayRepository.createOrUpdate(
        date,
        user._id,
        {
            user: user._id,
            date,
            caloricTarget: user.currentCaloricTarget,
            waterTarget: user.currentWaterTarget.value,
        },
        session
    );

    if (!trackDay) throw new BadRequestError('Failed to create track day.');

    return trackDay;
};

const addWaterIntake = async (date, user, quantity) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const trackDay = await getByDateAndUser(date, user);
        const waterIntake = trackDay.waterIntake + quantity;
        const updated = await trackDayRepository.createOrUpdate(date, user, { waterIntake });

        session.commitTransaction();
        return updated;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        throw err;
    }
};

module.exports = {
    getByDateAndUser,
    addWaterIntake,
};
