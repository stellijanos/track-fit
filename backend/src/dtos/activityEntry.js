module.exports = (data) => ({
    id: data._id,
    date: data.date,
    name: data.name,
    caloriesPerHour: data.caloriesPerHour,
    totalCalories: data.totalCalories,
    durationInM: data.durationInM,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});
