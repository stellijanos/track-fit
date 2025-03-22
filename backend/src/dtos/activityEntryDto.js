const response = (data) => {
    return {
        id: data._id,
        name: data.name,
        caloriesPerHour: data.caloriesPerHour,
        totalCalories: data.totalCalories,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};

module.exports = {
    response,
};
