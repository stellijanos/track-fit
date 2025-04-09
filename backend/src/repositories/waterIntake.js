const WaterIntake = require('../models/WaterIntake');

const findByDateAndUserId = async (date, userId) =>
    await WaterIntake.findOne({ date, user: userId });

const createEntryByDateAndUserId = async (date, userId, entry) => {
    let waterIntake = await WaterIntake.findOne({ date, user: userId });
    if (!waterIntake) {
        waterIntake = await WaterIntake.create({ date, user: userId });
    }

    waterIntake.entries.push(entry);
    const updated = await waterIntake.save();
    return updated.entries.at(-1);
};

const deleteEntryByIdDateAndUserId = async (entryId, date, userId) => {
    const waterIntake = await WaterIntake.findOne({ date, user: userId });
    if (!waterIntake) return null;

    const entry = waterIntake.entries.id(entryId);
    if (!entry) return null;

    entry.deleteOne();

    return await waterIntake.save();
};

module.exports = {
    findByDateAndUserId,
    createEntryByDateAndUserId,
    deleteEntryByIdDateAndUserId,
};
