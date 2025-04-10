const NotFoundError = require('../errors/NotFound');
const waterIntakeRepository = require('../repositories/waterIntake');

const getByDateAndUserId = async (date, userId) =>
    await waterIntakeRepository.findIntakeByDateAndUserId(date, userId);

const createEntryByDateAndUserId = async (date, userId, data) =>
    await waterIntakeRepository.createEntryByDateAndUserId(date, userId, {
        quantity: data.quantity * 1,
    });

const deleteEntryByIdDateAndUserId = async (id, date, userId) => {
    const waterIntake = await waterIntakeRepository.deleteEntryByIdDateAndUserId(id, date, userId);
    if (!waterIntake) throw new NotFoundError('Water intake');
    if (waterIntake.entries.length === 0) await waterIntakeRepository.deleteIntakeByDateAndUserId(date, userId);
};

module.exports = {
    getByDateAndUserId,
    createEntryByDateAndUserId,
    deleteEntryByIdDateAndUserId,
};
