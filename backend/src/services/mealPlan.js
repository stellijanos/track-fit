const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const UnprocessableEntityError = require('../errors/UnprocessableEntity');
const mealPlanRepository = require('../repositories/mealPlan');
const openAiService = require('./openAi');

/**
 * Retrieve values of the specified keys
 *
 * @param {Object} data - Caloric target of the user
 * @returns {Object} - Caloric target of the user with only specified keys
 */
const getValues = (data) => {
    const keys = ['activityLevel', 'physicalGoal', 'goalSpeed', 'kcal', 'protein', 'carb', 'fat'];
    return Object.fromEntries(keys.map((key) => [key, data[key]]));
};

/**
 * Retrieve values of the specified keys
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Caloric target of the user
 * @returns {Object} - Caloric target of the user with only specified keys
 */
const getUserInfo = (user, data) => ({
    gender: user.gender,
    birthDate: user.birthDate,
    height: user.height,
    weight: user.lastMeasurement.weight,
    bodyFatPercentage: user.lastMeasurement.bodyFatPercentage,
    skeletalMuscleMass: user.lastMeasurement.skeletalMuscleMass,
    caloricTarget: getValues(user.currentCaloricTarget),
    mealPlanType: data.planType,
    mealsPerDay: data.mealsPerDay,
    dailyMealPrepTime: data.dailyMealPrepTime,
    preference: data.preference,
    restrictions: data.restrictions,
    preferredFoods: data.preferredFoods,
    excludedFoods: data.excludedFoods,
    otherAllergies: data.otherAllergies,
    notes: data.notes,
});

/**
 * Create (AI generate) meal plan for the user based on:
 * - personal info (age, height, weight)
 * - caloric target
 * - data (other specified preferences, allergies, etc.)
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Meal plan information.
 * @returns {Mealplan} - Newly created meal plan.
 */
const create = async (user, data) => {
    console.info(user);

    if (!user.lastMeasurement) {
        throw new UnprocessableEntityError('Please enter your weight in order to generate meal plan.')
    }
    // 1. Obtain the necessary user info to generate meal plan
    const info = getUserInfo(user, data);

    // 2. Retrieve generated meal plan as a JSON string
    const response = await openAiService.getMealPlan(info);
    
    // 3. Create then return the created meal plan
    return await mealPlanRepository.create({
        user: user._id,
        preference: data.preference,
        mealsPerDay: data.mealsPerDay,
        restrictions: data.restrictions,
        preferredFoods: data.preferredFoods,
        excludedFoods: data.excludedFoods,
        ...response,
    });
};

/**
 * Retriev all meal plans as previews (not detailed) for the user
 *
 * @param {ObjectId} userId - Id of the user.
 * @returns {MealPlan[]} - Previews of the meal entries
 */
const getAllPreviewByUserId = async (userId) =>
    await mealPlanRepository.findAllPreviewByUserId(userId);

/**
 * Retrieve meal plan based on its Id and user
 *
 * @param {String} id - Id of the meal plan
 * @param {ObjectId} userId - Id of the user
 * @returns {MealPlan} - Found meal plan
 * @throws {NotFoundError} - Meal plan not found
 */
const getByIdAndUserId = async (id, userId) => {
    // 1. Retrieve meal plan based on id and user id
    const found = await mealPlanRepository.findByIdAndUserId(id, userId);

    // 2. Throw Error if not found
    if (!found) throw new NotFoundError('Meal plan');

    // 3. return the found meal plan
    return found;
};

/**
 * Delete meal plan based on its id and user id
 *
 * @param {User} user - User mongoose object.
 * @param {Object} data - Activity information.
 * @returns {void} - Returns notthing.
 * @throws {BadRequestError} - Failed to delete meal plan: not found or missing permissions.
 */
const deleteByIdAndUserId = async (id, userId) => {
    // 1. Delete meal plan
    const deleted = await mealPlanRepository.deleteByIdAndUserId(id, userId);

    // 2. Throw error if it was not deleted
    if (!deleted)
        throw new BadRequestError('Failed to delete meal plan: not found or missing permissions.');
};

module.exports = {
    create,
    getAllPreviewByUserId,
    getByIdAndUserId,
    deleteByIdAndUserId,
};
