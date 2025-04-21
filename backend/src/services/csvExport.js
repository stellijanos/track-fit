const measurementRepository = require('../repositories/measurement');
const activityEntryRepository = require('../repositories/activityEntry');
const mealEntryRepository = require('../repositories/mealEntry');
const caloricTargetRepository = require('../repositories/caloricTarget');
const waterIntakeRepository = require('../repositories/waterIntake');
const NotFoundError = require('../errors/NotFound');
const jsonToCsv = require('../utils/functions/jsonToCsv');

const measurements = async (userId, from, until) => {
    let data;
    if (!from || !until) {
        data = await measurementRepository.findAllByUserId(userId);
    } else {
        data = await measurementRepository.findAllByUserIdBetweenDates(userId, from, until);
    }
    if (!data.length) throw new NotFoundError('Measurements');

    return jsonToCsv.measurements(data);
};

const activities = async (userId, from, until) => {
    let data;
    if (!from || !until) {
        data = await activityEntryRepository.findAllByUserId(userId);
    } else {
        data = await activityEntryRepository.findAllByUserIdBetweenDates(userId, from, until);
    }
    console.log(data);
    if (!data.length) throw new NotFoundError('Activities');

    return jsonToCsv.activities(data);
};

const meals = async (userId, from, until) => {
    let data;
    if (!from || !until) {
        data = await mealEntryRepository.findAllByUserId(userId);
    } else {
        data = await mealEntryRepository.findAllByUserIdBetweenDates(userId, from, until);
    }
    console.log(data);
    if (!data.length) throw new NotFoundError('Meals');

    return jsonToCsv.meals(data);
};

const caloricTargets = async (userId, from, until) => {
    let data;
    if (!from || !until) {
        data = await caloricTargetRepository.findAllByUserId(userId);
    } else {
        data = await caloricTargetRepository.findAllByUserIdBetweenDates(userId, from, until);
    }
    console.log(data);
    if (!data.length) throw new NotFoundError('Caloric targets');

    return jsonToCsv.caloricTargets(data);
};

const waterIntake = async (userId, from, until) => {
    let data;
    if (!from || !until) {
        data = await waterIntakeRepository.findAllByUserId(userId);
    } else {
        data = await waterIntakeRepository.findAllByUserIdBetweenDates(userId, from, until);
    }
    console.log(data);
    if (!data.length) throw new NotFoundError('Water intake');

    return jsonToCsv.waterIntake(data);
};

module.exports = { measurements, activities, meals, caloricTargets, waterIntake };
