const caloricTargetRepository = require('../repositories/caloricTarget');
const openAiService = require('./openAi');
const userService = require('./user');

const ConflictError = require('../errors/Conflict');
const BadRequestError = require('../errors/BadRequest');
const { UnprocessableEntityError } = require('openai/error.mjs');

const create = async (user, data) => {
    if (!user.height || !user.lastMeasurement)
        throw new UnprocessableEntityError(
            'Enter your height and at least 1 measurement in order to get caloric target'
        );

    const responseString = await openAiService.getCaloricTarget({
        gender: user.gender,
        birthDate: user.birthDate,
        height: user.height,
        weight: user.lastMeasurement.weight,
        bodyFatPercentage: user.lastMeasurement.bodyFatPercentage,
        skeletalMuscleMass: user.lastMeasurement.skeletalMuscleMass,
        activityLevel: data.activityLevel,
        physicalGoal: data.physicalGoal,
        goalSpeed: data.goalSpeed,
    });

    const { kcal, protein, carb, fat } = JSON.parse(responseString);
    console.log(responseString, kcal, protein, carb, fat);

    const created = await caloricTargetRepository.create({
        user: user._id,
        activityLevel: data.activityLevel,
        physicalGoal: data.physicalGoal,
        goalSpeed: data.goalSpeed,
        kcal,
        protein,
        carb,
        fat,
        kcalPerKg: (kcal / user.lastMeasurement.weight).toFixed(2),
        proteinPerKg: (protein / user.lastMeasurement.weight).toFixed(2),
        carbPerKg: (carb / user.lastMeasurement.weight).toFixed(2),
        fatPerKg: (fat / user.lastMeasurement.weight).toFixed(2),
    });
    if (!created) throw new BadRequestError('Failed to create caloric target.');

    const updated = await caloricTargetRepository.updateByIdAndUserId(user.currentCaloricTarget, user._id, {
        isLocked: false,
    });
    if (!updated) throw new BadRequestError('Failed to update current caloric target.');

    await userService.updateById(user._id, { currentCaloricTarget: created._id });
    return created;
};

const getAllByUserId = async (userId) => await caloricTargetRepository.findAllByUserId(userId);

const deleteByIdAndUserId = async (id, userId) => {
    const caloricTarget = await caloricTargetRepository.findById(id);
    if (caloricTarget.isLocked) throw new ConflictError('Current caloric target cannot be deleted.');

    const deleted = await caloricTargetRepository.deleteByIdAndUserId(id, userId);
    if (!deleted) throw new BadRequestError('Failed to delete caloric target: not found or missing permissions');
};

module.exports = {
    create,
    getAllByUserId,
    deleteByIdAndUserId,
};
