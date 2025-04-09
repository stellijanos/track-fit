const mealDto = (data) => ({
    id: data._id,
    name: data.name,
    description: data.description,
    type: data.type,
    kcal: data.kcal,
    protein: data.protein,
    carb: data.carbs,
    fat: data.fat,
    fibre: data.fibre,
    salt: data.salt,
});

const dayDto = (data) => ({
    id: data._id,
    name: data.name,
    description: data.description,
    dailyCaloricTarget: data.dailyCaloricTarget,
    dailyMacros: data.dailyMacros,
    meals: (data.meals || []).map(mealDto),
});

module.exports = (data) => ({
    id: data._id,
    name: data.name,
    type: data.type,
    preference: data.preference,
    mealsPerDay: data.mealsPerDay,
    restrictions: data.restrictions,
    preferredFoods: data.preferredFoods,
    excludedFoods: data.excludedFoods,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    days: (data.days || []).map(dayDto),
});
