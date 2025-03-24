const BadRequestError = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFound');
const mealPlanRepository = require('../repositories/mealPlan');
const openAiService = require('./openAi');

const getValues = (data) => {
    const keys = ['activityLevel', 'physicalGoal', 'goalSpeed', 'kcal', 'protein', 'carb', 'fat'];
    return Object.fromEntries(keys.map((key) => [key, data[key]]));
};

const create = async (user, data) => {
    const responseString = await openAiService.getMealPlan({
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

    const response = JSON.parse(responseString);
    console.log(responseString);

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

const getAllPreviewByUserId = async (userId) => await mealPlanRepository.findAllPreviewByUserId(userId);

const getByIdAndUserId = async (id, userId) => {
    const found = await mealPlanRepository.findByIdAndUserId(id, userId);
    if (!found) throw new NotFoundError('Meal plan');
    return found;
};

const deleteByIdAndUserId = async (id, userId) => {
    const deleted = await mealPlanRepository.deleteByIdAndUserId(id, userId);
    console.log(deleted);
    if (!deleted) throw new BadRequestError('Failed to delete meal plan: not found or missing permissions.');
};

module.exports = {
    create,
    getAllPreviewByUserId,
    getByIdAndUserId,
    deleteByIdAndUserId,
};
