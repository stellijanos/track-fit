const NotFoundError = require('../errors/NotFound');
const waterIntakeRepository = require('../repositories/waterIntake');

const getByDateAndUserId = async (date, userId) =>
    await waterIntakeRepository.findByDateAndUserId(date, userId);

const createEntryByDateAndUserId = async (date, userId, data) => {
    const entry = { quantity: data.quantity * 1 };
    return await waterIntakeRepository.createEntryByDateAndUserId(date, userId, entry);
};

const deleteEntryByIdDateAndUserId = async (id, date, userId) => {
    const waterIntake = await waterIntakeRepository.deleteEntryByIdDateAndUserId(id, date, userId);
    if (!waterIntake) throw new NotFoundError('Water intake entry');
    return waterIntake;
};

module.exports = {
    getByDateAndUserId,
    createEntryByDateAndUserId,
    deleteEntryByIdDateAndUserId,
};
