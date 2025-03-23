module.exports = (data) => ({
    id: data._id,
    name: data.name,
    kcal: data.kcal,
    protein: data.protein,
    carb: data.carb,
    fat: data.fat,
    proteinPerKg: data.proteinPerKg,
    carbPerKg: data.carbPerKg,
    fatPerKg: data.fatPerKg,
    isLocked: data.isLocked,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});
