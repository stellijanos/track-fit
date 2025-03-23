module.exports = (data) => ({
    id: data._id,
    date: data.date,
    weight: data.weight,
    bodyFatPercentage: data.bodyFatPercentage,
    skeletalMuscleMass: data.bodyFatPercentage,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});
