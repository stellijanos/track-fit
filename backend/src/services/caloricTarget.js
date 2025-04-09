const caloricTargetRepository = require('../repositories/caloricTarget');
const openAiService = require('./openAi');
const userService = require('./user');

const ConflictError = require('../errors/Conflict');
const BadRequestError = require('../errors/BadRequest');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');

/**
 * Create a new caloric target
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Caloric target preferences.
 * @returns {ActivityEntry} - Newly created caloric target.
 * @throws {UnprocessableEntityError} - Enter your height and at least 1 measurement in order to get caloric target.
 * @throws {BadRequestError} - Failed to update current caloric target.
 * @throws {BadRequestError} - Failed to set users current caloric target.
 */
const create = async (user, data) => {
    // 1. Throw error if user height or at least 1 measurement input does not exist
    if (!user.height || !user.lastMeasurement)
        throw new UnprocessableEntityError(
            'Enter your height and at least 1 measurement in order to get caloric target.'
        );

    // 2. Retrieve estimated caloric target data using AI based on user info and preferences
    const response = await openAiService.getCaloricTarget({
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

    // 3. Retrieve the calories and macronutrient values
    const { kcal, protein, carb, fat } = response;

    // 4. Save caloric target to the database
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

    // 5. Unlock the current caloric target to be possible for deletion
    const updated = await caloricTargetRepository.updateByIdAndUserId(
        user.currentCaloricTarget,
        user._id,
        {
            isLocked: false,
        }
    );
    if (!updated) throw new BadRequestError('Failed to update current caloric target.');

    // 6. Set the newly created caloric target as the users current caloric target
    const updatedUser = await userService.updateById(user._id, {
        currentCaloricTarget: created._id,
    });
    if (!updatedUser) throw new BadRequestError('Failed to set users current caloric target.');

    // 7. Return the created caloric target
    return created;
};

/**
 * Retrieve all caloric targets based on user user id
 *
 * @param {ObjectId} userId - Id of the user.
 * @returns {CaloricTarget[]} - Array of caloric targets of the user
 */
const getAllByUserId = async (userId) => await caloricTargetRepository.findAllByUserId(userId);

/**
 * Delete caloric target based on id and userId
 *
 * @param {String} id - Caloric target id.
 * @param {ObjectId} userId - User id.
 * @returns {void} - Returns nothing.
 * @throws {ConflictError} - Current caloric target cannot be deleted.
 * @throws {BadRequestError} - Failed to delete caloric target: not found or missing permissions
 */
const deleteByIdAndUserId = async (id, userId) => {
    // 1. Retrieve caloric
    const caloricTarget = await caloricTargetRepository.findById(id);

    // 2. Throw error if it exists and cannot be deleted (is locked)
    if (caloricTarget && caloricTarget.isLocked)
        throw new ConflictError('Current caloric target cannot be deleted.');

    // 3. Delete caloric target
    const deleted = await caloricTargetRepository.deleteByIdAndUserId(id, userId);

    // 4. Throw error if deletion failed
    if (!deleted)
        throw new BadRequestError(
            'Failed to delete caloric target: not found or missing permissions'
        );
};

module.exports = {
    create,
    getAllByUserId,
    deleteByIdAndUserId,
};
